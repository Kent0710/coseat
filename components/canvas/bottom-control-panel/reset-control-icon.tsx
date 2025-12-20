"use client";

import { BrushCleaning } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import useBlocksStore from "@/store/use-blocks";
import { useCallback, useEffect } from "react";

const ResetControlIcon = () => {
    const { setChairs } = useChairsStore();
    const { setBlocks } = useBlocksStore()

    const handleClick = useCallback(() => {
        setChairs([]);
        setBlocks([]);
    }, [setBlocks, setChairs]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "r" || e.key === "R") {
                handleClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClick])

    return <ControlIcon icon={BrushCleaning} onClick={handleClick} />;
};

export default ResetControlIcon;
