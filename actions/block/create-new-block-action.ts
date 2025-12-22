"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function createNewBlockAction(
    eventId: string,
    x: number,
    y: number,
    width: number,
    height: number
) {
    if (!eventId) {
        return {
            success: false,
            message: "Event ID is required to create a block.",
        };
    }

    if (
        !Number.isFinite(x) ||
        !Number.isFinite(y) ||
        !Number.isFinite(width) ||
        !Number.isFinite(height)
    ) {
        return {
            success: false,
            message: "Invalid block dimensions.",
        };
    }

    try {
        const newBlockRef = await adminDb
            .collection("events")
            .doc(eventId)
            .collection("blocks")
            .add({
                x,
                y,
                width,
                height,
                text: "",
            });

        return {
            success: true,
            newBlock: {
                id: newBlockRef.id,
                x,
                y,
                width,
                height,
                text: "",
            },
        };
    } catch (err) {
        throw new Error("Failed to create new block", { cause: err });
    }
}
