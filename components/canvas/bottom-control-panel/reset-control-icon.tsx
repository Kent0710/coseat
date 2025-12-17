"use client";

import { BrushCleaning } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";

const ResetControlIcon = () => {
    const { setChairs } = useChairsStore();

    const handleClick = () => {
        setChairs([]);
    };

    return <ControlIcon icon={BrushCleaning} onClick={handleClick} />;
};

export default ResetControlIcon;
