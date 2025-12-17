import { create } from "zustand";

const useZoomPanStore = create<{
    zoom: number;
    pan: { x: number; y: number };
    setZoom: (zoom: number) => void;
    setPan: (pan: { x: number; y: number }) => void;
}>((set) => ({
    zoom: 1,
    pan: { x: 0, y: 0 },
    setZoom: (zoom) => set({ zoom }),
    setPan: (pan) => set({ pan }),
}));

export default useZoomPanStore;