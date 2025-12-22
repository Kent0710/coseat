'use server'

import { adminDb } from "@/lib/firebase/admin"

export async function deleteChairByIdAction(eventId: string, chairId: string) {
    if (!eventId) {
        return {
            success: false,
            message: "Event ID is required.",
        };
    }

    if (!chairId) {
        return {
            success: false,
            message: "Chair ID is required.",
        };
    }

    try {
        const chairRef = adminDb
            .collection("events")
            .doc(eventId)
            .collection("chairs")
            .doc(chairId);
        const chairDoc = await chairRef.get();
        if (!chairDoc.exists) {
            throw new Error("Chair not found.");
        }
        const res = await chairRef.delete();

        if (!res) {
            return {
                success: false,
                message: "Failed to delete chair.",
            };
        }
        return {
            success: true,
        };
    } catch (error) {
        throw new Error("Failed to delete chair", { cause: error });
    }
}