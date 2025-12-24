"use server";

// Import your ADMIN instance, not the client 'db'
import { adminDb } from "@/lib/firebase/admin";
import { generateEventCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createEventAction() {
    try {
        const eventCode = generateEventCode();

        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 5) {
            const snapshot = await adminDb
                .collection("events")
                .where("code", "==", eventCode)
                .get();
            if (snapshot.empty) {
                isUnique = true;
            }
            attempts++;
        }

        if (!isUnique) {
            console.error(
                "[CREATE_EVENT_ERROR]. Unable to generate unique event code"
            );
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }

        const docRef = await adminDb.collection("events").add({
            title: "New Event",
            code: eventCode,
            createdAt: new Date(),
        });

        if (!docRef || !docRef.id) {
            console.error(
                "[CREATE_EVENT_ERROR]. No document ID returned after creating event"
            );
            return {
                success: false,
                message: "Something went wrong. Please try again.",
            };
        }

        revalidatePath("/home");
        return {
            success: true,
            eventId: docRef.id,
        };
    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Unexpected error occurred. Please refresh and try again.",
        };
    }
}
