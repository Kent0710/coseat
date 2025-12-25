'use server'

import { setSession } from "./set-session"
import { getSession } from "./get-session"
import { createProfileAction } from "../profile/create-profile-action"
import { signOut } from "./sign-out"

export async function joinWithGoogleAction(idToken: string) {
    // 1. set the session cookie
    const { success: setSessionSuccess, message: setSessionMessage } = await setSession(idToken)

    if (!setSessionSuccess) {
        return { success: false, message: setSessionMessage }
    }

    try {
        // 2. get user info from token we verified
        const { decodedToken, success, message } = await getSession();

        if (!decodedToken || !success) {
            await signOut();
            return { success: false, message: message}
        }

        // 3. create profile
        const {success: createProfileSuccess, message: createProfileMessage} = await createProfileAction(
            decodedToken.name || "New User",
            decodedToken.email || ""
        )

        if (!createProfileSuccess) {
            await signOut();
            return { success: false, message: createProfileMessage }
        };

        return { success: true }

    } catch (error) {
        console.error("[GOOGLE_AUTH_ERROR]", error);

        await signOut();

        return { success: false, message: "Authentication failed" }
    }
}