import CreateNewEventButton from "@/components/events/create-new-event-button";
import { Button } from "@/components/ui/button";
import { PageWrapper, SectionWrapper } from "@/components/wrappers";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

const HomePage = () => {
    return (
        <PageWrapper
            title="What event for your seating do you have for today?"
            description="The most seamless seating arrangement organizer you could ever use."
        >
            <div className="flex gap-2 items-center">
                <CreateNewEventButton />
                <Link href={`/events/join`}>
                    <Button variant={"secondary"}>Get Event Code</Button>
                </Link>
            </div>

            <SectionWrapper
                title={
                    <div className="flex items-center gap-2">
                        <Clock /> Recents
                    </div>
                }
            >
                <div className="w-[20rem] h-[15rem] rounded-2xl border">
                    <div className="w-full h-[10rem] bg-neutral-100 rounded-t-2xl" />
                    <div className="px-6 py-2">
                        <h4 className="font-medium text-lg">Event Name</h4>
                        <div className="flex items-center gap-2 text-muted-foreground mt-1">
                            <Calendar size={17} /> <p>Created: Jun 15 2025</p>
                        </div>
                    </div>
                </div>
            </SectionWrapper>
        </PageWrapper>
    );
};

export default HomePage;
