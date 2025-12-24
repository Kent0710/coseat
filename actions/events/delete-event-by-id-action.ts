"use server";

import { adminDb } from "@/lib/firebase/admin";
import { revalidatePath } from "next/cache";

export async function deleteEventByIdAction(eventId: string) {
    if (!eventId || typeof eventId !== "string") {
        return { success: false, message: "A valid Event ID is required." };
    }

    try {
        const docRef = adminDb.collection("events").doc(eventId);

        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            return {
                success: false,
                message: "Event not found. It may have already been deleted.",
            };
        }

        await docRef.delete();

        revalidatePath("/home");
        revalidatePath(`/events/${eventId}`);

        return {
            success: true,
            message: "Event deleted successfully",
        };
    } catch (error) {
        console.error(`[DELETE_EVENT_ERROR] ID: ${eventId}:`, error);

        return {
            success: false,
            message:
                "An error occurred while deleting the event. Please try again.",
        };
    }
}
