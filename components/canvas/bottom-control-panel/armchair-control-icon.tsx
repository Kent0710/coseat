'use client'

import { Armchair } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import { useRef } from "react";

interface ArmchairControlIconProps {
    pan: { x: number; y: number };
    zoom: number;
}

const ArmchairControlIcon: React.FC<ArmchairControlIconProps> = ({ pan, zoom }) => {
    const counter = useRef(0);
    const { setChairs } = useChairsStore()

    const handleClick = () => {
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
    }

    return (
        <ControlIcon icon={Armchair} onClick={handleClick} />
    )
};

export default ArmchairControlIcon;