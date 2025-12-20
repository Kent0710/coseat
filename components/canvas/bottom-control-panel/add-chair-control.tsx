'use client'

import { Armchair } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import { useCallback, useEffect, useRef } from "react";

interface AddChairControlProps {
    pan: { x: number; y: number };
    zoom: number;
}

const AddChairControl: React.FC<AddChairControlProps> = ({ pan, zoom }) => {
    const counter = useRef(0);
    const { setChairs } = useChairsStore()

    const handleClick = useCallback(() => {
        // Transform screen center to canvas coordinates
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;
        
        const canvasX = (screenCenterX - pan.x) / zoom;
        const canvasY = (screenCenterY - pan.y) / zoom;

        setChairs((prev) => [
            ...prev,
            {
                id: `chair-${counter.current++}`,
                x: canvasX,
                y: canvasY,
                name: `Chair ${counter.current}`,
                isOccupied: false,
            },
        ]);
    }, [pan.x, pan.y, setChairs, zoom]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "c" || e.key === "C") {
                handleClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClick])

    return (
        <ControlIcon icon={Armchair} onClick={handleClick} keyShortcut="c" />
    )
};

export default AddChairControl;