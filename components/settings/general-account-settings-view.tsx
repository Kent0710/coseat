"use client";

import { signOut } from "@/actions/auth/sign-out";
import { useRouter } from "next/navigation";

import SideTabsViewTemplate from "../side-tabs/side-tabs-view-template";

import { Button } from "../ui/button";
import { useTransition } from "react";

const GeneralAccountSettingsView = () => {
    const [action, startTransition] = useTransition();
    const router = useRouter();

    const handleLogout = async () => {
        startTransition(async () => {
            await signOut();
            router.push("/");
        });
    };

    return (
        <SideTabsViewTemplate
            title="General Settings"
            description="Manage your general account settings and preferences."
            className="w-[70%]"
        >
            {/* logout section  */}
            <section className="flex items-center justify-between gap-8">
                <div>
                    <h2 className="text-lg font-medium">Logout</h2>
                    <p>
                        Logging out will end your current session. You will need
                        to log back in to access your account.
                    </p>
                </div>
                <Button
                    variant="destructive"
                    onClick={handleLogout}
                    disabled={action}
                >
                    {action ? "Logging out..." : "Logout"}
                </Button>
            </section>
        </SideTabsViewTemplate>
    );
};

export default GeneralAccountSettingsView;
