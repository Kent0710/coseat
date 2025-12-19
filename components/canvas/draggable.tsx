"use client";

import { BlockType, DraggableType } from "@/lib/types";
import useBlocksStore from "@/store/use-blocks";
import useZoomPanStore from "@/store/use-zoom-pan";
import React, { useRef, useState, useEffect } from "react";

interface DraggableProps extends DraggableType {
    children: React.ReactNode;
    disableDrag? : boolean;
}
const Draggable: React.FC<DraggableProps> = ({ children, x, y, id, disableDrag }) => {
    const [currentBlock, setCurrentBlock] = useState<BlockType | null>(null);
    const { setBlocks} = useBlocksStore()
    
    // zoom and pan offsets
    const { zoom, pan } = useZoomPanStore();

    const [isSelected, setIsSelected] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    // Offsets
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

    const ref = useRef<HTMLDivElement>(null);

    // get the current block that we are working on from the store
    useEffect(() => {
        const getCurrentBlockFromStore = ()=> {
            const block = useBlocksStore.getState().blocks.find((b) => b.id === id) || null;
            setCurrentBlock(block);
        };

        getCurrentBlockFromStore();

        // subscribe to store changes to update current block
        const unsubscribe = useBlocksStore.subscribe(
            () => {
                getCurrentBlockFromStore();
            }
        );

        return () => {
            unsubscribe();
        }
    }, [id])


    const handleMouseDown = (e: React.MouseEvent) => {
        if (disableDrag || !currentBlock) return;

        e.preventDefault();
        e.stopPropagation();

        setIsSelected(true);
        setIsDragging(true);

        // Calculate offset in canvas coordinates for mouse
        const canvasMouseX = (e.clientX - pan.x) / zoom;
        const canvasMouseY = (e.clientY - pan.y) / zoom;

        setDragOffset({
            x: canvasMouseX - currentBlock.x,
            y: canvasMouseY - currentBlock.y,
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (disableDrag || !currentBlock) return;
        
        e.stopPropagation();

        setIsDragging(true);

        // Calculate offsten in canvas for touch
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const canvasTouchX = (touch.clientX - pan.x) / zoom;
            const canvasTouchY = (touch.clientY - pan.y) / zoom;

            setDragOffset({
                x: canvasTouchX - currentBlock.x,
                y: canvasTouchY - currentBlock.y,
            });
        }
    };

    // the event handlers when dragging
    useEffect(() => {

        if (!isDragging) return; 

        const handleMouseMove = (e: MouseEvent) => {
            if (disableDrag) {
                setIsDragging(false);
                return;
            }

            // Transform screen coordinates to canvas coordinates
            const canvasMouseX = (e.clientX - pan.x) / zoom;
            const canvasMouseY = (e.clientY - pan.y) / zoom;

            // Subtract the offset to get position
            const canvasX = canvasMouseX - dragOffset.x;
            const canvasY = canvasMouseY - dragOffset.y;

            // Update local position state for smooth rendering
            setBlocks((blocks) =>
                blocks.map((block) =>
                    block.id === id ? { ...block, x: canvasX, y: canvasY } : block
                )
            );
              setCurrentBlock((prev) =>
                    prev ? { ...prev, x: canvasX, y: canvasY } : prev
                );
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];

                // Transform screen coordinates to canvas coordinates
                const canvasTouchX = (touch.clientX - pan.x) / zoom;
                const canvasTouchY = (touch.clientY - pan.y) / zoom;

                // Subtract the offset to get position
                const canvasX = canvasTouchX - dragOffset.x;
                const canvasY = canvasTouchY - dragOffset.y;

                // Update local positino state for smooth rendering
                setBlocks((blocks) =>
                    blocks.map((block) =>
                        block.id === id ? { ...block, x: canvasX, y: canvasY } : block
                    )
                );
                setCurrentBlock((prev) =>
                    prev ? { ...prev, x: canvasX, y: canvasY } : prev
                );
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchend", handleEnd);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("mouseup", handleEnd);
            document.removeEventListener("touchend", handleEnd);
        }
 
    }, [dragOffset.x, dragOffset.y, isDragging, pan.x, pan.y, zoom, disableDrag, setBlocks, id]);

    useEffect(() => {

        // Handle clicks outside to deselect
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsSelected(false);
            }
        };

        if (isSelected) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            }
        }

    }, [isSelected])

    return (
        <div
            id={id}
            ref={ref}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{
                top: currentBlock ? currentBlock.y : y,
                left: currentBlock ? currentBlock.x : x,
                position: "absolute",
                cursor: isDragging ? "grabbing" : "grab",
                userSelect: "none",
                border: isSelected ? "2px dashed blue" : "none",
                borderRadius: "16px",
                padding: "4px",
            }}
        >
            {children}
        </div>
    );
};

export default Draggable;
