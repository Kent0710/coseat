import { Calendar, Home, Inbox, Settings } from "lucide-react";

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
import { Input } from "./ui/input";
import Link from "next/link";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Events",
        url: "/events",
        icon: Calendar,
    },
    { title: "Inbox", url: "/inbox", icon: Inbox },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },
];

const AppSidebar = () => {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup className="space-y-2">
                    <SidebarGroupLabel>coseat</SidebarGroupLabel>
                    <Input placeholder="Search event..." />
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
