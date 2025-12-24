import { getEventsAction } from "@/actions/events/get-events-action";
import CreateNewEventButton from "@/components/events/create-new-event-button";
import JoinEventWithCodeButton from "@/components/events/join-event-with-code-button";
import { PageWrapper, SectionWrapper } from "@/components/wrappers";
import { formatEventDate } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const HomePage = async () => {
    return (
        <PageWrapper
            title="What event for your seating do you have for today?"
            description="The most seamless seating arrangement organizer you could ever use."
        >
            <div className="flex gap-2 items-center">
                <CreateNewEventButton />
                <JoinEventWithCodeButton />
            </div>

            <Suspense
                fallback={
                    <p className="text-muted-foreground mt-6">
                        Loading events...
                    </p>
                }
            >
                <RenderEvents />
            </Suspense>
        </PageWrapper>
    );
};

export default HomePage;

const RenderEvents = async () => {
    const events = await getEventsAction();

    return (
        <SectionWrapper
            title={
                <div className="flex items-center gap-2">
                    <Clock /> Events
                </div>
            }
        >
            {events.length === 0 ? (
                <p className="text-muted-foreground">
                    You have no events yet. Create a new event to get started.
                </p>
            ) : (
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6
                    animate-in slide-in-from-bottom-5 duration-300
                "
                >
                    {events.map((event) => (
                        <Link
                            key={event.id}
                            href={`/events/${event.id}`}
                            className="w-[20rem] h-[15rem] rounded-2xl border hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="w-full h-[10rem] bg-neutral-100 rounded-t-2xl" />
                            <div className="px-6 py-2">
                                <h4 className="font-medium text-lg">
                                    {event.title}
                                </h4>
                                <div className="flex items-center gap-2 text-muted-foreground mt-1">
                                    <Calendar size={17} />{" "}
                                    <p>
                                        Created:{" "}
                                        {formatEventDate(event.createdAt)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </SectionWrapper>
    );
};
