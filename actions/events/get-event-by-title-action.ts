"use server";

import { adminDb } from "@/lib/firebase/admin";
import { EventType } from "@/lib/types";

export const getEventByTitleAction = async (title: string) => {
    try {
        const eventsRef = adminDb.collection("events");
        const querySnapshot = await eventsRef.where("title", "==", title).get();
        if (querySnapshot.empty) {
            return null;
        }
        const eventData = querySnapshot.docs[0].data();
        return {
            id: querySnapshot.docs[0].id,
            title: eventData.title,
            createdAt: {
                _seconds: eventData.createdAt._seconds,
                _nanoseconds: eventData.createdAt._nanoseconds,
            },
        } as EventType;
    } catch (error) {
        throw new Error("Failed to get event by title", { cause: error });
        return null;
    }
};
