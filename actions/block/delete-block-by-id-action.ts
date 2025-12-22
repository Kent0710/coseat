"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function deleteBlockByIdAction(eventId: string, blockId: string) {
    if (!eventId) {
        return {
            success: false,
            message: "Event ID is required.",
        };
    }

    if (!blockId) {
        return {
            success: false,
            message: "Block ID is required.",
        };
    }

    try {
        const blockRef = adminDb
            .collection("events")
            .doc(eventId)
            .collection("blocks")
            .doc(blockId);
        const blockDoc = await blockRef.get();

        if (!blockDoc.exists) {
            throw new Error("Block not found.");
        }

        const res = await blockRef.delete();

        if (!res) {
            return {
                success: false,
                message: "Failed to delete block.",
            };
        } else {
            return {
                success: true,
            };
        }
    } catch (error) {
        throw new Error("Failed to delete block", { cause: error });
    }
}
