"use client";

import { Trash } from "lucide-react";
import { PreferencesViewTemplate } from "./preferences-dialog";
import { Button } from "@/components/ui/button";

const DangerPreferencesViwe = () => {
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
                    <Button variant="destructive">
                        <Trash /> Delete event
                    </Button>
                </li>
            </ul>
        </PreferencesViewTemplate>
    );
};

export default DangerPreferencesViwe;
