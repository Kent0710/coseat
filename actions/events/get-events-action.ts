"use server";

import { adminDb } from "@/lib/firebase/admin";
import { EventType } from "@/lib/types";

export async function getEventsAction() {
    try {
        const snapshot = await adminDb
            .collection("events")
            .orderBy("createdAt", "desc")
            .get();
        const events: EventType[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                title: data.title,
                createdAt: {
                    _seconds: data.createdAt._seconds,
                    _nanoseconds: data.createdAt._nanoseconds,
                },
            } as EventType;
        });
        return events;
    } catch (err) {
        throw new Error("Failed to fetch events", { cause: err });
    }
}
