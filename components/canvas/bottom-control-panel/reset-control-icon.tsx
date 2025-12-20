"use client";

import { BrushCleaning } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import useBlocksStore from "@/store/use-blocks";

const ResetControlIcon = () => {
    const { setChairs } = useChairsStore();
    const { setBlocks } = useBlocksStore()

    const handleClick = () => {
        setChairs([]);
        setBlocks([]);
    };

    return <ControlIcon icon={BrushCleaning} onClick={handleClick} />;
};

export default ResetControlIcon;
