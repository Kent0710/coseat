import { redirect } from "next/navigation";
import { createEventAction } from "@/actions/events/create-event-action";
import FormActionSubmitButton from "../form-action-submit-button";

const CreateNewEventButton = () => {
    const handleCreateNew = async () => {
        'use server'

        const newEventId = await createEventAction();

        if (newEventId) {
            redirect(`/events/${newEventId}`);
        } else {
            // TODO: Handle error
        }
    };

    return (
        <form action={handleCreateNew}>
            <FormActionSubmitButton>
                Create New
            </FormActionSubmitButton>
        </form>
    );
};

export default CreateNewEventButton;
