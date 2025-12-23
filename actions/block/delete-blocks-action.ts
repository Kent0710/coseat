"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function deleteBlocksAction(eventId: string) {
    try {
        const blocksSnapshot = await adminDb
            .collection("events")
            .doc(eventId)
            .collection("blocks")
            .get();
        const batch = adminDb.batch();
        blocksSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        return { success: true };
    } catch (err) {
        throw new Error("Failed to delete blocks", { cause: err });
    }
}
