"use client";

import { redirect } from "next/navigation";

import BottomControlPanel from "@/components/canvas/bottom-control-panel/bottom-control-panel";
import LeftControlPanel from "@/components/canvas/left-control-panel/left-control-panel";
import { useEffect, useRef } from "react";
import useChairsStore from "@/store/use-chairs";
import Chair from "./chair";

interface CanvasProps {
    eventId: string;
}
const Canvas: React.FC<CanvasProps> = ({ eventId }) => {
    const { chairs } = useChairsStore();
    const canvasRef = useRef(null);

    if (!eventId) redirect("/home");

    useEffect(() => {
        // entrance animation of the last element in the chairs
        if (chairs.length === 0) return;
        const lastChair = chairs[chairs.length - 1];
        const chairElement = document.getElementById(lastChair.id);
        if (chairElement) {
            chairElement.animate(
                [
                    { transform: 'scale(0)', opacity: 0 },
                    { transform: 'scale(1.2)', opacity: 1, offset: 0.7 },
                    { transform: 'scale(1)', opacity: 1 },
                ],
                {
                    duration: 200,
                    easing: 'ease-out',
                }
            );
        }

    }, [chairs]);

    return (
        <div className="bg-neutral-100 h-dvh w-dvw p-4" ref={canvasRef}>
            <LeftControlPanel />
            <BottomControlPanel />

            {chairs.map((chair) => (
                <Chair
                    key={chair.id}
                    className="absolute"
                    x={chair.x}
                    y={chair.y}
                    id={chair.id}
                />
            ))}
        </div>
    );
};

export default Canvas;
