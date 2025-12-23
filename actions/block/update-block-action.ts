"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function updateBlockAction(
    chairId: string,
    eventId: string,
    newX: number,
    newY: number,
    newWidth: number,
    newHeight: number
) {
    try {
        if (!chairId) {
            return {
                success: false,
                message: "Block does not exist, missing.",
            };
        }
        const blockRef = adminDb
            .collection("events")
            .doc(eventId)
            .collection("blocks")
            .doc(chairId);
        await blockRef.update({
            x: newX,
            y: newY,
            width: newWidth,
            height: newHeight,
        });
        return { success: true };
    } catch (error) {
        throw new Error("Failed to update block", { cause: error });
    }
}
