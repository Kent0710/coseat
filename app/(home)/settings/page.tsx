"use client";

import { JSX } from "react";


import { PageWrapper } from "@/components/wrappers";
import GeneralAccountSettingsView from "@/components/settings/general-account-settings-view";
import DangerAccountSettingsView from "@/components/settings/danger-account-settings-view";

import SideTabs from "@/components/side-tabs/side-tabs";

type ViewType = "general" | "danger";

interface ViewConfig {
    key: ViewType;
    label: string;
    component: () => JSX.Element;
}

const VIEWS: ViewConfig[] = [
    {
        key: "general",
        label: "General",
        component: () => <GeneralAccountSettingsView />,
    },
    {
        key: "danger",
        label: "Danger Zone",
        component: () => <DangerAccountSettingsView />,
    },
];

const SettingsPage = () => {
    return (
        <PageWrapper
            title="Settings"
            description="Manage your account settings and preferences."
        >
            <SideTabs ViewType="general" Views={VIEWS} />
        </PageWrapper>
    );
};

export default SettingsPage;
