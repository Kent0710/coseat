"use server";

import { adminDb } from "@/lib/firebase/admin";
import { EventType } from "@/lib/types";

export async function getEventByIdAction(eventId: string) {
    try {
        const eventDoc = await adminDb.collection("events").doc(eventId).get();

        if (!eventDoc.exists) {
            return {
                success: true,
                event: null,
                message: "Event not found. Please try again",
            };
        }

        const event = {
            id: eventDoc.id,
            title: eventDoc.data()?.title || "N/A",
            createdAt: {
                _seconds: eventDoc.data()?.createdAt.seconds || 0,
                _nanoseconds: eventDoc.data()?.createdAt.nanoseconds || 0,
            },
            code: eventDoc.data()?.code || "N/A",
        } as EventType;

        return {
            success: true,
            event,
        };
    } catch (err) {
        console.error("GET_EVENT_ERROR", err);
        return {
            success: false,
            message: "Failed to get event. Please try again.",
            event: null,
        };
    }
}
