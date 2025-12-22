"use server";

import { adminDb } from "@/lib/firebase/admin";

export async function deleteChairsAction(eventId: string) {
    try {
        const chairsSnapshot = await adminDb
            .collection("events")
            .doc(eventId)
            .collection("chairs")
            .get();
        const batch = adminDb.batch();

        chairsSnapshot.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });
        await batch.commit();

        return { success: true };
    } catch (err) {
        throw new Error("Failed to delete chairs", { cause: err });
    }
}
