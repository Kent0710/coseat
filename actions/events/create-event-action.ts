"use server";

// Import your ADMIN instance, not the client 'db'
import { adminDb } from "@/lib/firebase/admin"; 
import { revalidatePath } from "next/cache";

export async function createEventAction() {
    try {
        // Admin SDK syntax: .collection().add()
        const docRef = await adminDb.collection("events").add({
            title: "New Event",
            createdAt: new Date(),
        });

        revalidatePath("/home");
        return docRef.id;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to create event", { cause: err });
    }
}