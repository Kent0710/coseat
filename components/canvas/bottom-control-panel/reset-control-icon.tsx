"use client";

import { BrushCleaning } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import useBlocksStore from "@/store/use-blocks";
import { useCallback, useEffect } from "react";

import { deleteChairsAction } from "@/actions/chair/delete-chairs-action";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { getEventIdOnParams } from "@/lib/utils";
import { deleteBlocksAction } from "@/actions/block/delete-blocks-action";

const ResetControlIcon = () => {
    const pathname = usePathname();

    const { chairs, setChairs } = useChairsStore();
    const { blocks, setBlocks } = useBlocksStore();

    const handleClick = useCallback(() => {
        const deleteAll = async () => {
            // copy of the original store
            const chairsCopy = chairs;
            const blocksCopy = blocks;

            // optimistic UI update
            setChairs([]);
            setBlocks([]);

            const eventId = getEventIdOnParams(pathname);

            if (!eventId) {
                toast.error("Failed to clear canvas. Please try again.");
                return;
            }

            const deleteChairsRes = await deleteChairsAction(eventId);
            const deleteBlocksRes = await deleteBlocksAction(eventId);

            const res = {
                success: deleteChairsRes.success && deleteBlocksRes.success,
            };

            if (!res.success) {
                toast.error("Failed to clear canvas. Please try again.");

                // rollback to the original store
                setChairs(chairsCopy);
                setBlocks(blocksCopy);

                return;
            }
            
            toast.success("Canvas cleared.");
        };

        deleteAll();
    }, [blocks, chairs, pathname, setBlocks, setChairs]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "z" || e.key === "Z") {
                if (chairs.length === 0 && blocks.length === 0) return;

                handleClick();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [blocks.length, chairs.length, handleClick]);

    return (
        <ControlIcon
            icon={BrushCleaning}
            onClick={handleClick}
            keyShortcut="z"
        />
    );
};

export default ResetControlIcon;
