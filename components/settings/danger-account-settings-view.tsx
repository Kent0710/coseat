import SideTabsViewTemplate from "../side-tabs/side-tabs-view-template";

import { Button } from "../ui/button";

const DangerAccountSettingsView = () => {
    return (
        <SideTabsViewTemplate
            title="Danger Zone"
            description="Warning: The actions in this section are irreversible. Please proceed with caution."
            className="w-[70%]"
        >
            {/* delete account section  */}
            <section className="flex items-center justify-between gap-8">
                <div>
                    <h2 className="text-lg font-medium">Delete Account</h2>
                    <p>
                        Deleting your account is permanent and cannot be undone.
                        All your data will be lost. Please be certain before
                        proceeding.
                    </p>
                </div>
                <Button variant="destructive">Delete Account</Button>
            </section>
        </SideTabsViewTemplate>
    );
};

export default DangerAccountSettingsView;
