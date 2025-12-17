import { ChairType } from "@/lib/types";

import { create } from "zustand";

const useChairsStore = create<{
    chairs: ChairType[];
    setChairs: (
        chairs: ChairType[] | ((prev: ChairType[]) => ChairType[])
    ) => void;
}>((set) => ({
    chairs: [],
    setChairs: (chairs) =>
        set((prevState) => ({
            chairs:
                typeof chairs === "function"
                    ? chairs(prevState.chairs)
                    : chairs,
        })),
}));

export default useChairsStore;
