"use client";

import { Armchair } from "lucide-react";
import ControlIcon from "./control-icon";
import useChairsStore from "@/store/use-chairs";
import { useCallback, useEffect } from "react";
import { usePathname } from "next/navigation";

import { createNewChairAction } from "@/actions/chair/create-new-chair-action";
import { generateTemporaryChairId } from "@/lib/utils";
import { toast } from "sonner";

interface AddChairControlProps {
    pan: { x: number; y: number };
    zoom: number;
}

const AddChairControl: React.FC<AddChairControlProps> = ({ pan, zoom }) => {
    const pathname = usePathname();

    const { chairs, setChairs } = useChairsStore();

    const handleClick = useCallback(async () => {
        const chairsCopy = chairs;

        // Generate temporary chair for optimistic UI
        const tempChairId = generateTemporaryChairId();

        // Transform screen center to canvas coordinates
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const canvasX = (screenCenterX - pan.x) / zoom;
        const canvasY = (screenCenterY - pan.y) / zoom;

        setChairs((prev) => [
            ...prev,
            {
                id: tempChairId,
                x: canvasX,
                y: canvasY,
                name: "",
            },
        ]);

        const { success, message, newChair } = await createNewChairAction(
            pathname.split("/")[2],
            canvasX,
            canvasY
        );

        if (!success || !newChair) {
            // Revert optimistic update
            setChairs(chairsCopy);

            console.error(message);
            toast.error("Something went wrong. Please try again.");
            return;
        } else {
            // Replace temporary chair with the one from the server
            setChairs((prev) =>
                prev.map((chair) =>
                    chair.id === tempChairId ? newChair : chair
                )
            );
            toast.success("Chair added successfully!");
        }
    }, [chairs, pan.x, pan.y, pathname, setChairs, zoom]);

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
    }, [handleClick]);

    return (
        <ControlIcon icon={Armchair} onClick={handleClick} keyShortcut="c" />
    );
};

export default AddChairControl;
