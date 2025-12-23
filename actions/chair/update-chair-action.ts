"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function updateChairAction(
    chairId: string,
    eventId: string,
    newX: number,
    newY: number
) {
    try {
        if (!chairId) {
            return {
                success: false,
                message: "Chair does not exist, missing.",
            };
        }

        const chairRef = adminDb
            .collection("events")
            .doc(eventId)
            .collection("chairs")
            .doc(chairId);
        await chairRef.update({
            x: newX,
            y: newY,
        });

        return { success: true };
    } catch (error) {
        throw new Error("Failed to update chair", { cause: error });
    }
}
