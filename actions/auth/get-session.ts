"use server";

import { adminAuth } from "@/lib/firebase/admin";
import { cookies } from "next/headers";

export async function getSession() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session")?.value;

    if (!sessionCookie) {
        return {
            success: false,
            message: "No session cookie found",
        };
    }

    try {
        const decodedToken = await adminAuth.verifySessionCookie(
            sessionCookie,
            true
        );

        return {
            decodedToken,
            success: true,
        };
    } catch (error) {
        console.error("[GET_SESSION_ERROR]", error);

        return {
            success: false,
            message: "Invalid session cookie",
        };
    }
}
