import { getEventByIdAction } from "@/actions/events/get-event-by-id-action";
import Canvas from "@/components/canvas/canvas";
import { redirect } from "next/navigation";

interface SingleEventPageProps {
    params: Promise<{
        eventId: string;
    }>;
}
const SingleEventPage: React.FC<SingleEventPageProps> = async ({ params }) => {
    const eventId = (await params).eventId;
    const event = await getEventByIdAction(eventId);

    if (!event) {
        redirect("/home");
    }

    return <Canvas eventId={eventId} />;
};

export default SingleEventPage;
