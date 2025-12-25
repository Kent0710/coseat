"use server";

import { adminDb } from "@/lib/firebase/admin";
import { getSession } from "../auth/get-session";

export async function createProfileAction(name: string, email: string) {
    const {decodedToken, success} = await getSession();
    if (!success || !decodedToken) {
        return { success: false, message: "No valid session found." };
    }

    try {
        const uid = decodedToken.uid;

        const profileRef = adminDb.collection("profiles").doc(uid);

        const existing = await profileRef.get();
        if (existing.exists) {
            return { success: false, message: "Profile already exists." };
        }

        await profileRef.set({
            name,
            email,
            createdAt: new Date(),
            auth_id: uid, 
        });

        return { success: true };
    } catch (error) {
        console.error("[CREATE_PROFILE_ERROR]", error);
        return {
            success: false,
            message: "An error occurred while creating the profile.",
        };
    }
}
