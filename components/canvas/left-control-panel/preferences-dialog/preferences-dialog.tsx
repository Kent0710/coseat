"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { JSX } from "react";
import GeneralPreferencesView from "./general-preferences-view";
import DangerPreferencesViwe from "./danger-preferences-view";
import SideTabs from "@/components/side-tabs/side-tabs";

type ViewType = "general" | "danger";

interface ViewConfig {
    key: ViewType;
    label: string;
    component: () => JSX.Element;
}

const VIEWS: ViewConfig[] = [
    { key: "general", label: "General", component: GeneralPreferencesView },
    { key: "danger", label: "Danger Zone", component: DangerPreferencesViwe },
];

const PreferencesDialog = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Settings2 className="mr-2 h-4 w-4" />
                    Preferences
                </Button>
            </DialogTrigger>
            <DialogContent className="min-w-[50rem]">
                <DialogHeader>
                    <DialogTitle>Preferences</DialogTitle>
                    <DialogDescription>
                        Manage event preferences and settings here.
                    </DialogDescription>
                </DialogHeader>

                <SideTabs ViewType="general" Views={VIEWS} />
            </DialogContent>
        </Dialog>
    );
};

export default PreferencesDialog;
