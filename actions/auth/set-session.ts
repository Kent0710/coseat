"use server";

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";

export async function setSession(idToken: string) {
    try {
        if (!idToken) {
            return {
                success: false,
                message: "Invalid ID token",
            };
        }

        const expiresIn = 24 * 60 * 60 * 1000;
        const sessionCookie = await adminAuth.createSessionCookie(idToken, {
            expiresIn,
        });

        const cookieStore = await cookies();

        cookieStore.set("session", sessionCookie, {
            maxAge: expiresIn / 1000,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return {
            success: true,
        };
    } catch (error) {
        console.error("[SET_SESSION_ERROR]", error);
        return {
            success: false,
            message: "Failed to set session",
        };
    }
}
