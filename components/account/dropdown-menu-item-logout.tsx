"use client";

import { signOut } from "@/actions/auth/sign-out";
import { useRouter } from "next/navigation";

import { LogOut } from "lucide-react";
import { DropdownMenuItem } from "../ui/dropdown-menu";

const DropdownMenuItemLogout = () => {
    const router = useRouter()

    const handleLogout = async () => {
        await signOut()
        router.push("/");
    };

    return (
        <DropdownMenuItem
            onSelect={async () => {
                await handleLogout();
            }}
        >
            <LogOut />
            <span>Sign out</span>
        </DropdownMenuItem>
    );
};

export default DropdownMenuItemLogout;
