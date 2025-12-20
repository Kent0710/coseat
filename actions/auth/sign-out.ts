'use server'

import { cookies } from "next/headers";
import { auth } from "@/lib/firebase/firebase";

export async function signOut() {
    try {
        // Signs out the current user. This does not automatically revoke the user's ID token.
        // To fully sign out, you may also want to clear any session cookies on the server side.
        const cookieStore = await cookies();
        cookieStore.delete({
            name: "session",
            path: "/",
        });

        return auth.signOut();
    } catch (error) {
        throw new Error("Error signing out: " + (error as Error).message);
    }
}