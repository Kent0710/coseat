"use client";

import { useCallback, useEffect } from "react";
import useBlocksStore from "@/store/use-blocks";

import { Square } from "lucide-react";
import ControlIcon from "./control-icon";

import { createNewBlockAction } from "@/actions/block/create-new-block-action";
import { usePathname } from "next/navigation";
import { getEventIdOnParams } from "@/lib/utils";
import { toast } from "sonner";

interface AddBlockControlProps {
    pan: { x: number; y: number };
    zoom: number;
}
const AddBlockControl: React.FC<AddBlockControlProps> = ({ pan, zoom }) => {
    const pathname = usePathname();
    const { setBlocks } = useBlocksStore();

    const handleClick = useCallback(async () => {
        // Transform screen center to canvas coordinates
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const canvasX = (screenCenterX - pan.x) / zoom;
        const canvasY = (screenCenterY - pan.y) / zoom;

        // TODO: use optimistic UI update here
        const { success, message, newBlock } = await createNewBlockAction(
            getEventIdOnParams(pathname),
            canvasX,
            canvasY,
            100,
            100
        );

        if (!success || !newBlock) {
            console.error(message);
            toast.error("Something went wrong. Please try again.");
            return;
        }

        toast.success("New block added.");

        setBlocks((prev) => [
            ...prev,
            {
                id: newBlock.id,
                x: canvasX,
                y: canvasY,
                text: '',
                width: 100,
                height: 100,
            },
        ]);
    }, [pan.x, pan.y, pathname, setBlocks, zoom]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "b" || e.key === "B") {
                handleClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleClick]);

    return <ControlIcon icon={Square} onClick={handleClick} keyShortcut="b" />;
};

export default AddBlockControl;
