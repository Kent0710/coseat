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
import React, { JSX, useState } from "react";
import GeneralPreferencesView from "./general-preferences-view";
import DangerPreferencesViwe from "./danger-preferences-view";

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
    const [activeView, setActiveView] = useState<ViewType>("general");

    const ActiveComponent = VIEWS.find((v) => v.key === activeView)?.component;

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

                <div className="flex gap-6 min-h-[20rem]">
                    {/* Navigation Sidebar */}
                    <nav className="w-48 border-r pr-4">
                        <ul className="space-y-1">
                            {VIEWS.map(({ key, label }) => (
                                <li key={key}>
                                    <button
                                        onClick={() => setActiveView(key)}
                                        className={`
                                            w-full text-left px-3 py-2 rounded-md text-sm
                                            transition-colors
                                            ${
                                                activeView === key
                                                    ? "bg-primary text-primary-foreground"
                                                    : "hover:bg-muted"
                                            }
                                        `}
                                    >
                                        {label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Content Area */}
                    <section className="flex-1">
                        {ActiveComponent && <ActiveComponent />}
                    </section>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PreferencesDialog;

// the template for consistent view style

interface PreferencesViewTemplateProps {
    title: string;
    description: string;
    children: React.ReactNode;
}

export const PreferencesViewTemplate: React.FC<PreferencesViewTemplateProps> = ({
    title, description, children
}) => {
    return (
        <div>
            <h2 className="text-lg font-semibold">{title}</h2>
            <p className="border-b pb-4 mb-4">{description}</p>
            <div>{children}</div>
        </div>
    )
}