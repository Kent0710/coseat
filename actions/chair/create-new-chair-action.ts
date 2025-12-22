"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function createNewChairAction(
    eventId: string,
    x: number,
    y: number
) {
    if (!eventId)
        return {
            success: false,
            message: "Event ID is required to create a chair.",
        };

    if (!Number.isFinite(x) || !Number.isFinite(y)) {
        return {
            success: false,
            message: "Invalid chair coordinates.",
        };
    }

    try {
        const newChairRef = await adminDb
            .collection("events")
            .doc(eventId)
            .collection("chairs")
            .add({
                x,
                y,
                name: ''
            });

        return {
            success: true,
            newChair: {
                id: newChairRef.id,
                x,
                y,
                name: ''
            },
        };
    } catch (err) {
        throw new Error("Failed to create new chair", { cause: err });
    }
}
