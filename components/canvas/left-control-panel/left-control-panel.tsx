"use client";

import {
    ChevronDown,
    Settings2,
    Calendar,
    Home,
    Inbox,
    Settings,
} from "lucide-react";
import { Button } from "../../ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { useState } from "react";

const LeftControlPanel = () => {
    const [open, setOpen] = useState(false);

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
        {
            title: "Inbox",
            url: "/inbox",
            icon: Inbox,
        },
        {
            title: "Settings",
            url: "/settings",
            icon: Settings,
        },
    ];

    return (
        <div className="bg-white border shadow-sm rounded-2xl w-[20rem] p-4">
            <section className="flex items-center justify-between">
                <DropdownMenu
                    open={open}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
                >
                    <DropdownMenuTrigger className="outline-none">
                        <div className="flex items-center gap-2">
                            <p className="text-lg font-medium"> coseat </p>
                            <ChevronDown
                                className={` 
                                    transition-transform duration-200 
                                    ${open ? "rotate-180" : "rotate-0"}
                                    `}
                            />
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {items.map((item) => (
                            <Link href={item.url} key={item.title}>
                                <DropdownMenuItem className="flex items-center gap-4">
                                    <item.icon size={16} color="black" />
                                    <p className="text-base font-medium">
                                        {item.title}
                                    </p>
                                </DropdownMenuItem>
                            </Link>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <Button variant={"outline"}>
                    <Settings2 />
                    Preferences
                </Button>
            </section>
        </div>
    );
};

export default LeftControlPanel;
