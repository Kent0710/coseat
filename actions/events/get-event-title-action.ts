'use server'

import { adminDb } from "@/lib/firebase/admin"

export async function getEventTitleAction(eventId: string): Promise<string | null> {
    try {
        const eventDoc = await adminDb.collection("events").doc(eventId).get();
        if (!eventDoc.exists) {
            return null;
        }
        const eventData = eventDoc.data();
        return eventData?.title || null;
    }
    catch (err) {
        throw new Error("Failed to get event name by ID", { cause: err });
    }
}