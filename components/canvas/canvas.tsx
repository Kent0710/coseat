"use client";

import { redirect } from "next/navigation";

import BottomControlPanel from "@/components/canvas/bottom-control-panel/bottom-control-panel";
import LeftControlPanel from "@/components/canvas/left-control-panel/left-control-panel";
import { useEffect, useRef, useState } from "react";
import useZoomPanStore from "@/store/use-zoom-pan";

import RenderBlocks from "../block/render-blocks";
import RenderChairs from "../chair/render-chairs";

interface CanvasProps {
    eventId: string;
}
const Canvas: React.FC<CanvasProps> = ({ eventId }) => {
    const canvasRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    
    // Pan and zoom state
    const { zoom, pan, setZoom, setPan } = useZoomPanStore();
    
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
    }, [isPanning, panStart, setPan]);

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
    }, [zoom, pan, setPan, setZoom]);

    return (
        <div 
            className="bg-neutral-100 h-dvh w-dvw p-4 overflow-hidden" 
            ref={canvasRef}
            onMouseDown={handleCanvasMouseDown}
            style={{ cursor: isPanning ? 'grabbing' : 'default' }}
        >

            <LeftControlPanel />
            <BottomControlPanel pan={pan} zoom={zoom} />

            {/* Fixed grid background */}
            <div 
                className="absolute inset-4 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, #e5e5e5 1px, transparent 1px),
                        linear-gradient(to bottom, #e5e5e5 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px',
                }}
            />

            <div
                ref={viewportRef}
                className="w-full h-full relative"
                style={{
                    transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                    transformOrigin: '0 0',
                    willChange: 'transform',
                }}
            >
              <RenderChairs />
              <RenderBlocks />
            </div>
        </div>
    );
};

export default Canvas;
