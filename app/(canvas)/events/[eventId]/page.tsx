import LeftControlPanel from "@/components/canvas/left-control-panel";

interface SingleEventPageProps {
    params: Promise<{
        eventId: string;
    }>
}
const SingleEventPage : React.FC<SingleEventPageProps> = async ({
    params
}) => {
    const eventId = (await params).eventId;

    return (
        <div className="bg-neutral-100 h-dvh w-dvw p-4">
            {/* Left Control Panel  */}
            <LeftControlPanel />

        </div>
    )
};

export default SingleEventPage;