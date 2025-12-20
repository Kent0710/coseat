'use server'

import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return null;
    }

    try {
        const decodedClaims = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );
        return decodedClaims;
    } catch (error) {
        console.error("Error verifying session cookie:", error);
        return null;
    }
}