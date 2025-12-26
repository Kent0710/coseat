// actions/auth/join-with-google-action.ts
"use server";

import { adminDb } from "@/lib/firebase/admin";
import { setSession } from "./set-session";
import { getSession } from "./get-session";
import { signOut } from "./sign-out";

export async function joinWithGoogleAction(idToken: string) {
    // 1. Set the session cookie
    const { success: setSessionSuccess, message: setSessionMessage } =
        await setSession(idToken);

    if (!setSessionSuccess) {
        return { success: false, message: setSessionMessage };
    }

    try {
        // 2. Verify and get user info from the session we just set
        const session = await getSession();

        if (!session || !session.decodedToken || !session.success) {
            await signOut();
            return { success: false, message: "Could not verify session." };
        }

        const { uid, name, email } = session.decodedToken;

        // 3. Profile "Upsert" Logic
        const profileRef = adminDb.collection("profiles").doc(uid);
        const profileSnap = await profileRef.get();

        if (!profileSnap.exists) {
            // Only create if it's a new user
            await profileRef.set({
                auth_id: uid,
                name: name || "New User",
                email: email || "",
                createdAt: new Date(), // Firebase Admin converts JS Date to Timestamp automatically
            });
            console.log(`[AUTH]: Created new profile for ${uid}`);
        } else {
            console.log(`[AUTH]: Existing user ${uid} signed in`);
        }

        return { success: true };
    } catch (error) {
        console.error("[GOOGLE_AUTH_ERROR]", error);
        await signOut();
        return {
            success: false,
            message: "Authentication failed during profile setup.",
        };
    }
}
