'use client'

import { useState } from "react";

import { JSX } from "react";
import { twMerge } from "tailwind-merge";

/*
    A side tab component to be used in various settings and preferences dialogs.
    It will render a vertical list of tabs on the side, allowing users to switch between different views.
*/

interface SideTabsProps {
    ViewType: string;
    Views : {
        key: string;
        label: string;
        component: () => JSX.Element;
    }[];
    className? : string;
}

const SideTabs : React.FC<SideTabsProps> = ({
    ViewType,
    Views,
    className
}) => {
    const [activeTab, setActiveTab] = useState<typeof ViewType>(ViewType);

    const ActiveComponent = Views.find((v) => v.key === activeTab)?.component;

    return (
        <div className={twMerge(`flex gap-6 min-h-[20rem]`, className)}>
            {/* Navigation Sidebar */}
            <nav className="w-48 border-r pr-4">
                <ul className="space-y-1">
                    {Views.map(({ key, label }) => (
                        <li key={key}>
                            <button
                                onClick={() => setActiveTab(key)}
                                className={`
                                    w-full text-left px-3 py-2 rounded-md text-sm
                                    transition-colors
                                    ${
                                        activeTab === key
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
    )
};

export default SideTabs;