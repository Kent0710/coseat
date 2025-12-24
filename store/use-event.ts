import { EventType } from "@/lib/types";

import { create } from "zustand";

const useEventStore = create<{
    event: EventType | null;
    setEvent: (event: EventType | null) => void;
}>((set) => ({
    event: null,
    setEvent: (event) => set(() => ({ event })),
}));

export default useEventStore;
