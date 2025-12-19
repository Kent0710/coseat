"use client";

import React, { useState, useEffect } from "react";

import { BlockType } from "@/lib/types";
import Draggable from "./draggable";
import useBlocksStore from "@/store/use-blocks";

interface BlockProps extends BlockType {
    zoom: number;
    pan: { x: number; y: number };
    className?: string;
}

const Block: React.FC<BlockProps> = ({ id, x, y, width, height }) => {
    const { setBlocks } = useBlocksStore();

    const [onEdge, setOnEdge] = useState({
        top: false,
        right: false,
        bottom: false,
        left: false,
    });

    const handleEdgeDown = (e: React.MouseEvent) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const edgeThreshold = 10; // pixels

        if (offsetY < edgeThreshold) {
            setOnEdge((prev) => ({ ...prev, top: true }));
            console.log("on top edge");
        } else if (offsetY > rect.height - edgeThreshold) {
            setOnEdge((prev) => ({ ...prev, bottom: true }));
            console.log("on bottom edge");
        } else if (offsetX < edgeThreshold) {
            setOnEdge((prev) => ({ ...prev, left: true }));
            console.log("on left edge");
        } else if (offsetX > rect.width - edgeThreshold) {
            setOnEdge((prev) => ({ ...prev, right: true }));
            console.log("on right edge");
        } else {
            setOnEdge({ top: false, right: false, bottom: false, left: false });
        }
    };

    useEffect(() => {
        // top edge logic
        // rect.height increases, y decreases
        if (onEdge.top) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaY = e.movementY;
                            const newHeight = block.height - deltaY;
                            const newY = block.y + deltaY;
                            return {
                                ...block,
                                height: newHeight > 20 ? newHeight : 20,
                                y: newY,
                            };
                        }
                        return block;
                    })
                );
            };

            // handle mouse up
            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, top: false }));
            };

            // add event listener
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            // cleanup
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);

                setOnEdge((prev) => ({ ...prev, top: false }));
            };
        }
    }, [id, onEdge, setBlocks]);

    return (
        <Draggable
            x={x}
            y={y}
            id={id}
        >
            <div
                style={{
                    width: width,
                    height: height,
                    backgroundColor: "#f0f0f0",
                    border: "2px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onMouseDown={handleEdgeDown}
            ></div>
        </Draggable>
    );
};

export default Block;
