"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

import { Calendar, Search } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { getEventByTitleAction } from "@/actions/events/get-event-by-title-action";
import { createEventAction } from "@/actions/events/create-event-action";
import { toast } from "sonner";
import { EventType } from "@/lib/types";
import { formatEventDate } from "@/lib/utils";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";

const SearchEventDialog = () => {
    const [open, setOpen] = useState(false);
    const [result, setResult] = useState<EventType | null>(null);

    const [isSearching, startSearch] = useTransition();
    const [isCreating, startCreate] = useTransition();

    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    const handleSearch = () => {
        const eventTitle = inputRef.current?.value?.trim();
        if (!eventTitle) return;

        startSearch(async () => {
            const event = await getEventByTitleAction(eventTitle);

            if (event) {
                toast.success("Event found");
                setResult(event);
            } else {
                toast.error("Event not found");
                setResult(null);
            }
        });
    };

    const handleCreateEvent = () => {
        startCreate(async () => {
            const newEventId = await createEventAction();

            if (newEventId) {
                setOpen(false);
                router.push(`/events/${newEventId}`);
            } else {
                toast.error("Failed to create event.");
            }
        });
    };

    return (
        <Dialog
            open={open}
            onOpenChange={(isOpen) => {
                setOpen(isOpen);
                if (!isOpen) {
                    setResult(null);
                }
            }}
        >
            <DialogTrigger asChild>
                <button
                    className="
                        border rounded-2xl flex items-center p-2 gap-4
                        font-medium bg-neutral-100 hover:opacity-80
                    "
                >
                    <Search size={17} />
                    Search Event
                </button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Search for an event</DialogTitle>
                    <DialogDescription>
                        Can not find your event? How about{" "}
                        <button
                            className="text-blue-600 underline hover:cursor-pointer disabled:opacity-50"
                            onClick={handleCreateEvent}
                            disabled={isCreating}
                        >
                            {isCreating ? "creating..." : "creating one?"}
                        </button>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex items-center gap-4">
                    <Input
                        ref={inputRef}
                        placeholder="Search event..."
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSearch();
                        }}
                        disabled={isSearching || isCreating}
                    />

                    <Button
                        onClick={handleSearch}
                        disabled={isSearching || isCreating}
                    >
                        <Search />
                        Search
                    </Button>
                </div>

                {isSearching && (
                    <Skeleton className="h-20 w-full rounded-2xl" />
                )}

                {result && !isSearching && (
                    <EventSearchResult result={result} />
                )}
            </DialogContent>
        </Dialog>
    );
};

export default SearchEventDialog;

interface EventSearchResultProps {
    result: EventType;
}

const EventSearchResult: React.FC<EventSearchResultProps> = ({ result }) => {
    return (
        <Link href={`/events/${result.id}`}>
            <div
                className="
                    hover:cursor-pointer hover:shadow-sm transition
                    hover:opacity-70 border px-4 py-2 rounded-2xl
                    animate-in fade-in duration-300
                "
            >
                <h2 className="font-medium text-lg">{result.title}</h2>
                <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar size={17} />
                    <span>{formatEventDate(result.createdAt)}</span>
                </div>
            </div>
        </Link>
    );
};
