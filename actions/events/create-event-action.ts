"use server";

import { adminDb } from "@/lib/firebase/admin";
import { generateEventCode } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function createEventAction() {
    try {
        // 1. Optimized Title Logic: Find all titles starting with "New Event"
        const snapshot = await adminDb
            .collection("events")
            .where("title", ">=", "New Event")
            .where("title", "<=", "New Event" + "\uf8ff")
            .get();

        let finalTitle = "New Event";

        if (!snapshot.empty) {
            // Map out the existing titles
            const existingTitles = snapshot.docs.map((doc) => doc.data().title);

            // If the base title exists, find the next available number
            if (existingTitles.includes("New Event")) {
                let suffix = 1;
                while (existingTitles.includes(`New Event (${suffix})`)) {
                    suffix++;
                }
                finalTitle = `New Event (${suffix})`;
            }
        }

        // 2. Optimized Code Logic: Generate and verify uniqueness
        let eventCode = "";
        let isUnique = false;
        let attempts = 0;

        while (!isUnique && attempts < 5) {
            eventCode = generateEventCode(); // Generate INSIDE the loop
            const codeCheck = await adminDb
                .collection("events")
                .where("code", "==", eventCode)
                .limit(1) // Optimization: limit 1 is faster
                .get();

            if (codeCheck.empty) {
                isUnique = true;
            } else {
                attempts++;
            }
        }

        if (!isUnique) {
            return {
                success: false,
                message: "Server busy. Please try again.",
            };
        }

        // 3. Create the document
        const docRef = await adminDb.collection("events").add({
            title: finalTitle,
            code: eventCode,
            createdAt: new Date(),
        });

        revalidatePath("/home");
        return { success: true, eventId: docRef.id };
    } catch (err) {
        console.error("[CREATE_EVENT_ERROR]:", err);
        return { success: false, message: "Unexpected error occurred." };
    }
}
