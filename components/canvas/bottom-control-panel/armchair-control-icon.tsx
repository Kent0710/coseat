'use client'

import { Armchair } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import { useRef } from "react";

const ArmchairControlIcon = () => {
    const counter = useRef(0);
    const { setChairs } = useChairsStore()

    const handleClick = () => {
        const spawnCoordinate = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2,
        }

        setChairs((prev) => [
            ...prev,
            {
                id: `chair-${counter.current++}`,
                x: spawnCoordinate.x,
                y: spawnCoordinate.y,
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