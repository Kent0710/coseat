"use server";

import { adminDb } from "@/lib/firebase/admin";
import { getProfileAction } from "../profile/get-profile-action";

import { EVENT_ROLES } from "@/lib/utils";

export async function joinEventWithCodeAction(code: string) {
    try {
        // 1. check if event with code exists
        const eventsRef = adminDb.collection("events");
        const querySnapshot = await eventsRef.where("code", "==", code).get();

        if (querySnapshot.empty) {
            return {
                success: false,
                message: "Invalid event code. Please check and try again.",
            };
        }

        // 2. get profile id
        const { success: profileSuccess, profile, message: profileMessage } = await getProfileAction();

        if (!profileSuccess || !profile) {
            return { success: false, message: profileMessage };
        };

        const id = profile.id

        // 3. add new object on events/members collection
        const eventDoc = querySnapshot.docs[0];
        const eventId = eventDoc.id;

        await adminDb
            .collection("events")
            .doc(eventId)
            .collection("members")
            .add({
                joinedAt: new Date(),
                profileId: id,
                role : EVENT_ROLES.PENDING,
            });

        return { success: true, eventId };
    } catch (error) {
        console.error("[JOIN_EVENT_ERROR]", error);
        return {
            success: false,
            message:
                "An error occurred while joining the event. Please try again.",
        };
    }
}
