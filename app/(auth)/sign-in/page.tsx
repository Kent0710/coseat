"use client";

import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase/firebase";
import { joinWithGoogleAction } from "@/actions/auth/join-with-google-action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);
        const idToken = await result.user.getIdToken();

        const { success, message } = await joinWithGoogleAction(idToken);

        if (success) {
            toast.success("Welcome!");
            router.push("/home");
        } else {
            toast.error(message);
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-dvh">
            <Button onClick={handleGoogleSignIn} disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in with Google"}
            </Button>
        </div>
    );
}
