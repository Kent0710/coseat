"use client";

import {
    ChevronDown,
    Settings2,
    Calendar,
    Home,
    Inbox,
    Settings,
    Loader2,
} from "lucide-react";
import { Button } from "../../ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getEventIdOnParams } from "@/lib/utils";
import { toast } from "sonner";
import { getEventTitleAction } from "@/actions/events/get-event-title-action";

const LeftControlPanel = () => {
    const pathname = usePathname();
    const router = useRouter();

    const [mounted, setMounted] = useState(false);
    const [eventName, setEventName] = useState<string | null>(null);
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

    useEffect(() => {
        const getEvent = async () => {
            setMounted(true);

            const eventId = getEventIdOnParams(pathname);

            const eventName = await getEventTitleAction(eventId);

            if (!eventName) {
                toast.error("Event not found. Please try again.");
                router.push("/home");
                return;
            }

            setEventName(eventName);
        };

        getEvent();

        return () => {
            setEventName(null);
            setMounted(false);
        };
    }, [pathname, router]);

    return (
        <div className="bg-white border shadow-sm rounded-2xl w-[20rem] p-4 z-50 absolute top-4 left-4">
            <section className="flex items-center justify-between">
                <DropdownMenu
                    open={open}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
                >
                    {mounted ? (
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-medium">
                                    {eventName || "N/A"}
                                </p>
                                <ChevronDown
                                    className={` 
                                    transition-transform duration-200 
                                    ${open ? "rotate-180" : "rotate-0"}
                                    `}
                                />
                            </div>
                        </DropdownMenuTrigger>
                    ): (
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Loader2 className="animate-spin" />
                            <span
                                className="font-medium "
                            >Setting up...</span>
                        </div>
                    )}
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
