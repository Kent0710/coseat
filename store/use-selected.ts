import { create } from "zustand";

const useIsSelected = create<{
    isSelected: boolean;
    setIsSelected: (isSelected: boolean) => void;
}>((set) => ({
    isSelected: false,
    setIsSelected: (isSelected) => set({ isSelected }),
}));

export default useIsSelected;
