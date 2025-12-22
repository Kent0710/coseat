"use server";

import { adminDb } from "@/lib/firebase/admin";
import { ChairType } from "@/lib/types";

export async function getChairsAction(eventId: string): Promise<ChairType[]> {
    try {
        const snapshot = await adminDb
            .collection("events")
            .doc(eventId)
            .collection("chairs")
            .get();
        const chairs: ChairType[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                x: data.x,
                y: data.y,
                name: data.name,
            } as ChairType;
        });
        return chairs;
    } catch (err) {
        throw new Error("Failed to fetch chairs", { cause: err });
    }
}
