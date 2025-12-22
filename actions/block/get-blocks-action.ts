"use server";

import { adminDb } from "@/lib/firebase/admin";
import { BlockType } from "@/lib/types";

export async function getBlocksAction(eventId: string): Promise<BlockType[]> {
    try {
        const snapshot = await adminDb
            .collection("events")
            .doc(eventId)
            .collection("blocks")
            .get();
        const blocks: BlockType[] = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                x: data.x,
                y: data.y,
                text: data.text,
                width: data.width,
                height: data.height,
            } as BlockType;
        });
        return blocks;
    } catch (err) {
        throw new Error("Failed to fetch blocks", { cause: err });
    }
}
