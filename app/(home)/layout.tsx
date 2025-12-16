import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "@/components/app-sidebar";

const HomeLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="p-8">{children}</main>
        </SidebarProvider>
    );
};

export default HomeLayout;
