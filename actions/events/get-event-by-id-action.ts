'use server'

import { adminDb } from "@/lib/firebase/admin"

export async function getEventByIdAction(eventId: string) {
    try {

        const eventDoc = await adminDb.collection("events").doc(eventId).get();

        if (!eventDoc.exists) {
            return null;
        };

        return { id: eventDoc.id, ...eventDoc.data() };
    } catch (err) {
        throw new Error("Failed to get event by ID", { cause: err })
    }
}