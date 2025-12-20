"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";

import { setSession } from "@/actions/auth/set-session";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    const router = useRouter();

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const sessionResult = await setSession(idToken);
        if (sessionResult.status === "success") {
            router.push("/home");
        } else {
            toast.error("Failed to sign in. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh">
            <Button
                onClick={handleGoogleSignIn}
            >
                Sign in with Google
            </Button>
        </div>
    );
}
