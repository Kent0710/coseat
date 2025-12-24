"use client";

import { Trash } from "lucide-react";
import { PreferencesViewTemplate } from "./preferences-dialog";
import { Button } from "@/components/ui/button";

import { deleteEventByIdAction } from "@/actions/events/delete-event-by-id-action";
import { redirect, usePathname } from "next/navigation";
import { getEventIdOnParams } from "@/lib/utils";
import { toast } from "sonner";
import { useTransition } from "react";

const DangerPreferencesViwe = () => {
    const [action, startTransition] = useTransition();
    const eventId = getEventIdOnParams(usePathname());

    const handleDeleteClick = async () => {
        if (!eventId) return;

        startTransition(async () => {
            const result = await deleteEventByIdAction(eventId);
            if (result.success) {
                toast.success("Event deleted successfully");
                redirect("/home");
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <PreferencesViewTemplate
            title="Danger Zone"
            description="Proceed with caution, these may have irreversible effects."
        >
            <ul className="space-y-2">
                <li className="flex items-center justify-between">
                    <div>
                        <p className="font-medium">Delete Event</p>
                        <p className="mb-2">
                            Permanently delete this event and all associated
                            data. This action cannot be undone.
                        </p>
                    </div>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteClick}
                        disabled={action}
                    >
                        <Trash /> Delete event
                    </Button>
                </li>
            </ul>
        </PreferencesViewTemplate>
    );
};

export default DangerPreferencesViwe;
