"use client";

import { redirect } from "next/navigation";

import BottomControlPanel from "@/components/canvas/bottom-control-panel/bottom-control-panel";
import LeftControlPanel from "@/components/canvas/left-control-panel/left-control-panel";
import { useEffect, useRef, useState } from "react";
import useChairsStore from "@/store/use-chairs";
import Chair from "./chair";

interface CanvasProps {
    eventId: string;
}
const Canvas: React.FC<CanvasProps> = ({ eventId }) => {
    const { chairs } = useChairsStore();
    const canvasRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    
    // Pan and zoom state
    const [pan, setPan] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [isPanning, setIsPanning] = useState(false);
    const [panStart, setPanStart] = useState({ x: 0, y: 0 });

    if (!eventId) redirect("/home");

    // Handle canvas panning
    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        // Only start panning if clicking directly on the canvas/viewport
        if (e.target === viewportRef.current || e.target === canvasRef.current) {
            setIsPanning(true);
            setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
        }
    };

    useEffect(() => {
        if (!isPanning) return;

        const handleMouseMove = (e: MouseEvent) => {
            setPan({
                x: e.clientX - panStart.x,
                y: e.clientY - panStart.y,
            });
        };

        const handleMouseUp = () => {
            setIsPanning(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isPanning, panStart]);

    // Handle zoom with mouse wheel
    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            if (!viewportRef.current) return;
            
            e.preventDefault();
            
            const delta = -e.deltaY * 0.001;
            const newZoom = Math.min(Math.max(0.1, zoom + delta), 3);
            
            // Zoom towards mouse position
            const rect = viewportRef.current.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            
            const scale = newZoom / zoom;
            setPan({
                x: mouseX - (mouseX - pan.x) * scale,
                y: mouseY - (mouseY - pan.y) * scale,
            });
            
            setZoom(newZoom);
        };

        const viewport = viewportRef.current;
        if (viewport) {
            viewport.addEventListener('wheel', handleWheel, { passive: false });
            return () => {
                viewport.removeEventListener('wheel', handleWheel);
            };
        }
    }, [zoom, pan]);

    return (
        <div 
            className="bg-neutral-100 h-dvh w-dvw p-4 overflow-hidden" 
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        >
            <LeftControlPanel />
            <BottomControlPanel pan={pan} zoom={zoom} />

            <div
                ref={viewportRef}
                className="w-full h-full relative"
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: '0 0',
                    willChange: 'transform',
                }}
            >
                {chairs.map((chair) => (
                    <Chair
                        key={chair.id}
                        className="absolute"
                        x={chair.x}
                        y={chair.y}
                        id={chair.id}
                        zoom={zoom}
                        pan={pan}
                    />
                ))}
            </div>
        </div>
    );
};

export default Canvas;
