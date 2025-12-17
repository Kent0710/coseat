import Canvas from "@/components/canvas/canvas";

interface SingleEventPageProps {
    params: Promise<{
        eventId: string;
    }>;
}
const SingleEventPage: React.FC<SingleEventPageProps> = async ({ params }) => {
    const eventId = (await params).eventId;
    return <Canvas eventId={eventId} />;
};

export default SingleEventPage;
