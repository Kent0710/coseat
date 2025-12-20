"use client";

import { BrushCleaning } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import useBlocksStore from "@/store/use-blocks";
import { useCallback, useEffect } from "react";

const ResetControlIcon = () => {
    const { chairs, setChairs } = useChairsStore();
    const { blocks, setBlocks } = useBlocksStore()

    const handleClick = useCallback(() => {
        setChairs([]);
        setBlocks([]);
    }, [setBlocks, setChairs]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "r" || e.key === "R") {
                if (chairs.length === 0 && blocks.length === 0) return;

                handleClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [blocks.length, chairs.length, handleClick])

    return <ControlIcon icon={BrushCleaning} onClick={handleClick} keyShortcut="r" />;
};

export default ResetControlIcon;
