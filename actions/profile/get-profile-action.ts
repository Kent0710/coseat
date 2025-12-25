"use server";

import { adminDb } from "@/lib/firebase/admin";
import { getSession } from "../auth/get-session";

export async function getProfileAction() {
    try {
        const { decodedToken, success } = await getSession();
        if (!success || !decodedToken) {
            return { success: false, message: "No valid session found." };
        }

        const uid = decodedToken.uid;

        const profileRef = adminDb.collection("profiles").doc(uid);
        const profileDoc = await profileRef.get();

        if (!profileDoc.exists) {
            return { success: false, message: "Profile not found." };
        }

        const profileData = profileDoc.data();

        return {
            success: true,
            profile: { id: profileDoc.id, ...profileData },
        };
    } catch (error) {
        console.error("[GET_PROFILE_ERROR]", error);
        return {
            success: false,
            message: "An error occurred while retrieving the profile.",
        };
    }
}
