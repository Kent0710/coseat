"use client";

import useEventStore from "@/store/use-event";
import { PreferencesViewTemplate } from "./preferences-dialog";
import { toast } from "sonner";

const GeneralPreferencesView = () => {
    const { event } = useEventStore();

    const handleClickCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    return (
        <PreferencesViewTemplate
            title="General"
            description="General settings for your event."
        >
            <ul className="space-y-2">
                <li>
                    <p className="font-semibold ">Event Name</p>
                    <p className="mb-2">Use this name for quick search.</p>
                    <button
                        className="border px-4 py-2 rounded-2xl hover:cursor-copy w-full text-left hover:bg-muted"
                        onClick={() => handleClickCopy(event?.title || "")}
                    >
                        {event?.title || "N/A"}
                    </button>
                </li>
                <li>
                    <p className="font-semibold">Event Code</p>
                    <p className="mb-2">
                        Use this code to allow others to join your event.
                    </p>

                    <button
                        className="border px-4 py-2 rounded-2xl hover:cursor-copy w-full text-left hover:bg-muted"
                        onClick={() => handleClickCopy(event?.code || "")}
                    >
                        {event?.code || "N/A"}
                    </button>
                </li>
            </ul>
        </PreferencesViewTemplate>
    );
};

export default GeneralPreferencesView;
