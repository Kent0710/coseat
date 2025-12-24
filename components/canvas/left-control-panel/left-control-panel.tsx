"use client";

import {
    ChevronDown,
    Calendar,
    Home,
    Inbox,
    Settings,
    Loader2,
} from "lucide-react";

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
import PreferencesDialog from "./preferences-dialog/preferences-dialog";
import { getEventByIdAction } from "@/actions/events/get-event-by-id-action";
import { Skeleton } from "@/components/ui/skeleton";
import useEventStore from "@/store/use-event";

const LeftControlPanel = () => {
    const pathname = usePathname();
    const router = useRouter();

    const { event, setEvent } = useEventStore();

    const [mounted, setMounted] = useState(false);
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

            const { event, success, message } = await getEventByIdAction(
                eventId
            );

            if (!event && !success) {
                toast.error(message);
                router.push("/home");
                return;
            }

            setEvent(event);
        };

        getEvent();

        return () => {
            setEvent(null);
            setMounted(false);
        };
    }, [pathname, router, setEvent]);

    if (!event || !mounted) {
        return (
            <Skeleton className="bg-white border shadow-sm rounded-2xl w-[20rem] h-18 z-50 absolute top-4 left-4" />
        );
    }

    return (
        <div
            className="
            bg-white border shadow-sm rounded-2xl w-[20rem] p-4 z-50 absolute top-4 left-4
            animate-in slide-in-from-bottom-5 duration-300
        "
        >
            <section className="flex items-center justify-between">
                <DropdownMenu
                    open={open}
                    onOpenChange={(isOpen) => setOpen(isOpen)}
                >
                    {mounted ? (
                        <DropdownMenuTrigger className="outline-none">
                            <div className="flex items-center gap-2">
                                <p className="text-lg font-medium">
                                    {event?.title || "N/A"}
                                </p>
                                <ChevronDown
                                    className={` 
                                    transition-transform duration-200 
                                    ${open ? "rotate-180" : "rotate-0"}
                                    `}
                                />
                            </div>
                        </DropdownMenuTrigger>
                    ) : (
                        <div className="flex items-center gap-4 text-muted-foreground">
                            <Loader2 className="animate-spin" />
                            <span className="font-medium ">Setting up...</span>
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
                <PreferencesDialog />
            </section>
        </div>
    );
};

export default LeftControlPanel;
