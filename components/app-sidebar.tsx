"use client";

import { Calendar, Home, Inbox, Loader2, Settings } from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuItemLogout from "./account/dropdown-menu-item-logout";
import { User } from "lucide-react";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { getUsernameAction } from "@/actions/auth/get-username";

import SearchEventDialog from "./events/search-event-dialog";

const AppSidebar = () => {
    const [mounted, setMounted] = useState(false);
    const [name, setName] = useState<string | null>(null);

    const pathname = usePathname();

    const items = useMemo(
        () => [
            {
                title: "Home",
                url: "/home",
                icon: Home,
                active: pathname === "/home",
            },
            {
                title: "Events",
                url: "/events",
                icon: Calendar,
                active: pathname.startsWith("/events"),
            },
            {
                title: "Inbox",
                url: "/inbox",
                icon: Inbox,
                active: pathname === "/inbox",
            },
            {
                title: "Settings",
                url: "/settings",
                icon: Settings,
                active: pathname === "/settings",
            },
        ],
        [pathname]
    );

    useEffect(() => {
        const getUsername = async () => {
            setMounted(true);

            const username = await getUsernameAction();
            if (username) {
                setName(username);
            }
        };

        getUsername();

        return () => setMounted(false);
    }, []);

    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="space-y-2">
                    <SidebarGroupLabel>coseat</SidebarGroupLabel>
                    {mounted ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger className="text-left" asChild>
                                <div className="flex items-center justify-between border rounded-2xl p-2 w-full">
                                    <div className="flex items-center gap-4">
                                        <User size={17} />
                                        <span className="font-semibold">
                                            {name || "N/A"}
                                        </span>
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItemLogout />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <div className="hover:cursor-not-allowed flex items-center gap-4 border rounded-2xl p-2 w-full font-semibold text-muted-foreground">
                            <Loader2 size={17} className="animate-spin" />{" "}
                            Syncing up!
                        </div>
                    )}
                    <SearchEventDialog />
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-2">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link
                                            href={item.url}
                                            className="space-x-2"
                                        >
                                            <item.icon />
                                            <span className="text-base font-medium">
                                                {item.title}
                                            </span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    );
};

export default AppSidebar;
