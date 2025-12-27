"use client";

import { useCallback, useEffect } from "react";
import useBlocksStore from "@/store/use-blocks";

import { Square } from "lucide-react";
import ControlIcon from "./control-icon";

import { createNewBlockAction } from "@/actions/block/create-new-block-action";
import { usePathname } from "next/navigation";
import { generateTemporaryId, getEventIdOnParams } from "@/lib/utils";
import { toast } from "sonner";

interface AddBlockControlProps {
    pan: { x: number; y: number };
    zoom: number;
}
const AddBlockControl: React.FC<AddBlockControlProps> = ({ pan, zoom }) => {
    const pathname = usePathname();
    const { blocks, setBlocks } = useBlocksStore();

    const handleClick = useCallback(async () => {
        const blocksCopy = blocks;

        // Generate temporary block for optimistic UI
        const tempBlockId = generateTemporaryId();

        // Transform screen center to canvas coordinates
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const canvasX = (screenCenterX - pan.x) / zoom;
        const canvasY = (screenCenterY - pan.y) / zoom;

          setBlocks((prev) => [
            ...prev,
            {
                id: tempBlockId,
                x: canvasX,
                y: canvasY,
                text: '',
                width: 100,
                height: 100,
            },
        ]);

        const { success, message, newBlock } = await createNewBlockAction(
            getEventIdOnParams(pathname),
            canvasX,
            canvasY,
            100,
            100
        );

        if (!success || !newBlock) {
            // Revert optimistic update
            setBlocks(blocksCopy);

            console.error(message);
            toast.error("Something went wrong. Please try again.");
            return;
        } else {
            // Replace temporary block with the one from the server
            setBlocks((prev) =>
                prev.map((block) =>
                    block.id === tempBlockId ? newBlock : block
                )
            );

            toast.success("Block added successfully!");
        }
    }, [blocks, pan.x, pan.y, pathname, setBlocks, zoom]);

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
