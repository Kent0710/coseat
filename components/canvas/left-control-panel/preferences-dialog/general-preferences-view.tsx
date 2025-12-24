"use client";

import useEventStore from "@/store/use-event";
import { PreferencesViewTemplate } from "./preferences-dialog";

const GeneralPreferencesView = () => {
    const { event } = useEventStore();

    return (
        <PreferencesViewTemplate
            title="General"
            description="General settings for your event."
        >
            <ul className="space-y-2">
                <li>
                    <p className="font-semibold ">Event Name</p>
                    <p className="mb-2">Use this name for quick search.</p>
                    <p className="border px-4 py-2 rounded-2xl hover:cursor-copy">
                        {event?.title || "N/A"}
                    </p>
                </li>
                <li>
                    <p className="font-semibold">Event Code</p>
                    <p className="mb-2">
                        Use this code to allow others to join your event.
                    </p>
                    <p className="border px-4 py-2 rounded-2xl hover:cursor- ">
                        {event?.code || "N/A"}
                    </p>
                </li>
            </ul>
        </PreferencesViewTemplate>
    );
};

export default GeneralPreferencesView;
