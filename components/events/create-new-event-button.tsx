"use client";

import { redirect } from "next/navigation";
import { createEventAction } from "@/actions/events/create-event-action";
import { Button } from "../ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

const CreateNewEventButton = () => {
    const [action, startTransition] = useTransition();

    const handleCreateNew = async () => {
        startTransition(async () => {
            const { success, eventId, message } = await createEventAction();
            
            if (success && eventId) {
                redirect(`/events/${eventId}`);
            } else {
                toast.error(message);
            }
        });
    };

    return (
        <Button onClick={handleCreateNew} disabled={action}>
            Create New
        </Button>
    );
};

export default CreateNewEventButton;
