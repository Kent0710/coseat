// app/login/page.tsx (or your SignInPage path)
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { joinWithGoogleAction } from "@/actions/auth/join-with-google-action";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FirebaseError } from "firebase/app";

export default function SignInPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);

        try {
            const provider = new GoogleAuthProvider();

            // 1. Trigger Firebase Popup
            const result = await signInWithPopup(auth, provider);
            const idToken = await result.user.getIdToken();

            // 2. Send token to Server Action
            const { success, message } = await joinWithGoogleAction(idToken);

            if (success) {
                toast.success("Welcome back!");
                router.push("/home");
                router.refresh(); // Forces Next.js to re-check server-side auth
            } else {
                toast.error(message || "Failed to sync profile.");
            }
        } catch (error: unknown) {
            // Handle user closing the popup manually
            if (
                error instanceof FirebaseError &&
                error.code === "auth/popup-closed-by-user"
            ) {
                toast.error("Sign-in cancelled.");
            } else {
                console.error("Sign-in error:", error);
                toast.error("An error occurred during Google sign-in.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh bg-slate-50">
            <div className="p-8 bg-white shadow-xl rounded-2xl border flex flex-col items-center gap-6">
                <h1 className="text-2xl font-bold">Sign In</h1>
                <p className="text-muted-foreground text-center max-w-xs">
                    Sign in with your Google account to access your events.
                </p>
                <Button
                    onClick={handleGoogleSignIn}
                    disabled={isLoading}
                    className="w-full sm:w-64"
                >
                    {isLoading ? "Processing..." : "Continue with Google"}
                </Button>
            </div>
        </div>
    );
}
