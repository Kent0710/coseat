"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function joinEventWithCodeAction(code: string) {
    try {
        const eventsRef = adminDb.collection("events");
        const querySnapshot = await eventsRef.where("code", "==", code).get();

        if (querySnapshot.empty) {
            return {
                success: false,
                message: "Invalid event code. Please check and try again.",
            };
        }

        // add new object on events/members collection
        const eventDoc = querySnapshot.docs[0];
        const eventId = eventDoc.id;

        await adminDb
            .collection("events")
            .doc(eventId)
            .collection("members")
            .add({
                joinedAt: new Date(),
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
