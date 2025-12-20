import { getSession } from "@/actions/auth/get-session";


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { User } from "lucide-react";
import DropdownMenuItemLogout from "./dropdown-menu-item-logout";

const DropdownAccountSidebarView = async () => {
    const session = await getSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="text-left">
                <div className="flex items-center justify-between border rounded-2xl p-2 w-full">
                    <div className="flex items-center gap-4">
                        <User size={17} />
                        <span className="font-semibold">{session?.name || "N/A"}</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItemLogout />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownAccountSidebarView;
