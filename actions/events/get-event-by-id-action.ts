"use server";

import { adminDb } from "@/lib/firebase/admin";
import { EventType } from "@/lib/types";

export async function getEventByIdAction(
    eventId: string
): Promise<EventType | null> {
    try {
        const eventDoc = await adminDb.collection("events").doc(eventId).get();

        if (!eventDoc.exists) {
            return null;
        }

        return { id: eventDoc.id, ...eventDoc.data() } as EventType;
    } catch (err) {
        throw new Error("Failed to get event by ID", { cause: err });
    }
}
