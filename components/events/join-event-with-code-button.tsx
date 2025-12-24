"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { joinEventWithCodeAction } from "@/actions/events/join-event-with-code-action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

const JoinEventWithCodeButton = () => {
    const router = useRouter();

    const [action, startTransition] = useTransition();
    const [query, setQuery] = useState("");

    const handleJoinEvent = async () => {
        if (!query) {
            toast.error("Please enter an event code.");
            return;
        }

        startTransition(async () => {
            const { success, message, eventId } = await joinEventWithCodeAction(
                query
            );

            if (!success || !eventId) {
                toast.error(message);
                return;
            } else {
                router.push(`/events/${eventId}`);
            }
        });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Join Event with Code</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Enter Event Code</DialogTitle>
                    <DialogDescription>
                        Ask the event organizer for the event code to view the
                        event.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center gap-4">
                    <Input
                        type="text"
                        placeholder="Event Code"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <Button onClick={handleJoinEvent} disabled={action} className="min-w-[6rem]">
                        {action ? (
                            <>
                                <Loader2 className="animate-spin" /> 
                            </>
                        ) : (
                            "Join Event"
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default JoinEventWithCodeButton;
