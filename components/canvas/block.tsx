"use client";

import React, { useState, useEffect, useRef } from "react";

import { BlockType } from "@/lib/types";
import Draggable from "./draggable";
import useBlocksStore from "@/store/use-blocks";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface BlockProps extends BlockType {
    zoom: number;
    pan: { x: number; y: number };
    className?: string;
}

const Block: React.FC<BlockProps> = ({ id, x, y, width, height }) => {
    const blockRef = useRef<HTMLDivElement>(null);

    const { setBlocks } = useBlocksStore();

    // state for handling over (hover) edge states
    const [isEdgeOver, setIsEdgeOver] = useState({
        top: false,
        right: false,
        bottom: false,
        left: false,
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
    });

    // state for handling down edge (active) states
    const [onEdge, setOnEdge] = useState({
        top: false,
        right: false,
        bottom: false,
        left: false,
        topLeft: false,
        topRight: false,
        bottomLeft: false,
        bottomRight: false,
    });

    const handleEdgeDown = (e: React.MouseEvent) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const edgeThreshold = 10; // pixels
        const cornerThreshold = 15; // pixels for corners

        // Check corners first (priority over edges)
        if (offsetY < cornerThreshold && offsetX < cornerThreshold) {
            setOnEdge((prev) => ({ ...prev, topLeft: true }));
            console.log("on top-left corner");
        } else if (offsetY < cornerThreshold && offsetX > rect.width - cornerThreshold) {
            setOnEdge((prev) => ({ ...prev, topRight: true }));
            console.log("on top-right corner");
        } else if (offsetY > rect.height - cornerThreshold && offsetX < cornerThreshold) {
            setOnEdge((prev) => ({ ...prev, bottomLeft: true }));
            console.log("on bottom-left corner");
        } else if (offsetY > rect.height - cornerThreshold && offsetX > rect.width - cornerThreshold) {
            setOnEdge((prev) => ({ ...prev, bottomRight: true }));
            console.log("on bottom-right corner");
        } else if (offsetY < edgeThreshold) {
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
            setOnEdge({ top: false, right: false, bottom: false, left: false, topLeft: false, topRight: false, bottomLeft: false, bottomRight: false });
        }
    };

    const handleEdgeOver = (e: React.MouseEvent) => {
        const rect = (e.target as HTMLDivElement).getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;
        const edgeThreshold = 10; // pixels
        const cornerThreshold = 15; // pixels for corners

        // Check corners first (priority over edges)
        if (offsetY < cornerThreshold && offsetX < cornerThreshold) {
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: false,
                left: false,
                topLeft: true,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
            });
        } else if (offsetY < cornerThreshold && offsetX > rect.width - cornerThreshold) {
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: true,
                bottomLeft: false,
                bottomRight: false,
            });
        } else if (offsetY > rect.height - cornerThreshold && offsetX < cornerThreshold) {
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: true,
                bottomRight: false,
            });
        } else if (offsetY > rect.height - cornerThreshold && offsetX > rect.width - cornerThreshold) {
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: true,
            });
        } else if (offsetY < edgeThreshold) {
            setIsEdgeOver({
                top: true,
                right: false,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
            });
        } else if (offsetY > rect.height - edgeThreshold) {
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: true,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
            });
        } else if (offsetX < edgeThreshold) {
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: false,
                left: true,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
            });
        } else if (offsetX > rect.width - edgeThreshold) {
            setIsEdgeOver({
                top: false,
                right: true,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
            });
        } else {
            // inside the box
            setIsEdgeOver({
                top: false,
                right: false,
                bottom: false,
                left: false,
                topLeft: false,
                topRight: false,
                bottomLeft: false,
                bottomRight: false,
            });
        }
    };

    // useEffect
    useEffect(() => {
        if (blockRef.current) {
            if (isEdgeOver.topLeft || isEdgeOver.bottomRight) {
                blockRef.current.style.cursor = "nwse-resize";
            } else if (isEdgeOver.topRight || isEdgeOver.bottomLeft) {
                blockRef.current.style.cursor = "nesw-resize";
            } else if (isEdgeOver.top || isEdgeOver.bottom) {
                blockRef.current.style.cursor = "ns-resize";
            } else if (isEdgeOver.right || isEdgeOver.left) {
                blockRef.current.style.cursor = "ew-resize";
            } else {
                blockRef.current.style.cursor = "grab";
            }
        }
    }, [isEdgeOver.bottom, isEdgeOver.left, isEdgeOver.right, isEdgeOver.top, isEdgeOver.topLeft, isEdgeOver.topRight, isEdgeOver.bottomLeft, isEdgeOver.bottomRight]);

    useEffect(() => {
        // top edge logic
        // rect.height increases, y decreases
        if (onEdge.top) {
            const handleMouseMove = (e: MouseEvent) => {
                let newY = 0;
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaY = e.movementY;
                            const newHeight = block.height - deltaY;
                            newY = block.y + deltaY;
                            return {
                                ...block,
                                height: newHeight > 20 ? newHeight : 20,
                                y: newY,
                            };
                        }
                        return block;
                    })
                );

                // get the block from the dom
                const block = document.getElementById(id);
                // adjust the y position of the block visually
                if (block) {
                    const currentTop = parseFloat(block.style.top || "0");
                    block.style.top = `${currentTop + e.movementY}px`;
                }
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

        // left edge logic
        // rect.width increases, x decreases
        if (onEdge.left) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaX = e.movementX;
                            const newWidth = block.width - deltaX;
                            const newX = block.x + deltaX;
                            return {
                                ...block,
                                width: newWidth > 20 ? newWidth : 20,
                                x: newX,
                            };
                        }
                        return block;
                    })
                );

                // get the block from the dom
                const block = document.getElementById(id);

                // adjust the x position of the block visually
                if (block) {
                    const currentLeft = parseFloat(block.style.left || "0");
                    block.style.left = `${currentLeft + e.movementX}px`;
                }
            };

            // handle mouse up
            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, left: false }));
            };

            // add event listener
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            // cleanup
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, left: false }));
            };
        }

        // right edge logic
        // rect.width increases
        if (onEdge.right) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaX = e.movementX;
                            const newWidth = block.width + deltaX;
                            return {
                                ...block,
                                width: newWidth > 20 ? newWidth : 20,
                            };
                        }
                        return block;
                    })
                );
            };

            // handle mouse up
            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, right: false }));
            };

            // add event listener
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            // cleanup
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, right: false }));
            };
        }

        // bottom edge logic
        // rect.height increases
        if (onEdge.bottom) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaY = e.movementY;
                            const newHeight = block.height + deltaY;
                            return {
                                ...block,
                                height: newHeight > 20 ? newHeight : 20,
                            };
                        }
                        return block;
                    })
                );
            };
            // handle mouse up
            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, bottom: false }));
            };
            // add event listener
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });
            // cleanup
            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, bottom: false }));
            };
        }

        // top-left corner logic
        // width increases (x decreases), height increases (y decreases)
        if (onEdge.topLeft) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaX = e.movementX;
                            const deltaY = e.movementY;
                            const newWidth = block.width - deltaX;
                            const newHeight = block.height - deltaY;
                            const newX = block.x + deltaX;
                            const newY = block.y + deltaY;
                            return {
                                ...block,
                                width: newWidth > 20 ? newWidth : 20,
                                height: newHeight > 20 ? newHeight : 20,
                                x: newX,
                                y: newY,
                            };
                        }
                        return block;
                    })
                );

                const block = document.getElementById(id);
                if (block) {
                    const currentLeft = parseFloat(block.style.left || "0");
                    const currentTop = parseFloat(block.style.top || "0");
                    block.style.left = `${currentLeft + e.movementX}px`;
                    block.style.top = `${currentTop + e.movementY}px`;
                }
            };

            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, topLeft: false }));
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, topLeft: false }));
            };
        }

        // top-right corner logic
        // width increases, height increases (y decreases)
        if (onEdge.topRight) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaX = e.movementX;
                            const deltaY = e.movementY;
                            const newWidth = block.width + deltaX;
                            const newHeight = block.height - deltaY;
                            const newY = block.y + deltaY;
                            return {
                                ...block,
                                width: newWidth > 20 ? newWidth : 20,
                                height: newHeight > 20 ? newHeight : 20,
                                y: newY,
                            };
                        }
                        return block;
                    })
                );

                const block = document.getElementById(id);
                if (block) {
                    const currentTop = parseFloat(block.style.top || "0");
                    block.style.top = `${currentTop + e.movementY}px`;
                }
            };

            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, topRight: false }));
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, topRight: false }));
            };
        }

        // bottom-left corner logic
        // width increases (x decreases), height increases
        if (onEdge.bottomLeft) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaX = e.movementX;
                            const deltaY = e.movementY;
                            const newWidth = block.width - deltaX;
                            const newHeight = block.height + deltaY;
                            const newX = block.x + deltaX;
                            return {
                                ...block,
                                width: newWidth > 20 ? newWidth : 20,
                                height: newHeight > 20 ? newHeight : 20,
                                x: newX,
                            };
                        }
                        return block;
                    })
                );

                const block = document.getElementById(id);
                if (block) {
                    const currentLeft = parseFloat(block.style.left || "0");
                    block.style.left = `${currentLeft + e.movementX}px`;
                }
            };

            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, bottomLeft: false }));
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, bottomLeft: false }));
            };
        }

        // bottom-right corner logic
        // width increases, height increases
        if (onEdge.bottomRight) {
            const handleMouseMove = (e: MouseEvent) => {
                setBlocks((prevBlocks) =>
                    prevBlocks.map((block) => {
                        if (block.id === id) {
                            const deltaX = e.movementX;
                            const deltaY = e.movementY;
                            const newWidth = block.width + deltaX;
                            const newHeight = block.height + deltaY;
                            return {
                                ...block,
                                width: newWidth > 20 ? newWidth : 20,
                                height: newHeight > 20 ? newHeight : 20,
                            };
                        }
                        return block;
                    })
                );
            };

            const handleMouseUp = () => {
                setOnEdge((prev) => ({ ...prev, bottomRight: false }));
            };

            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp, { once: true });

            return () => {
                window.removeEventListener("mousemove", handleMouseMove);
                window.removeEventListener("mouseup", handleMouseUp);
                setOnEdge((prev) => ({ ...prev, bottomRight: false }));
            };
        }
    }, [id, onEdge, setBlocks]);

    // double click
    // double clicking allows for text editing inside the block
    const handleDoubleClick = (e: React.MouseEvent) => {
        e.stopPropagation();

        handleAddLabel();
    };

    const handleAddLabel = () => {
        if (!blockRef.current) return;

        const el = blockRef.current;

        requestAnimationFrame(() => {
            el.contentEditable = "true";
            el.focus();

            const range = document.createRange();
            range.selectNodeContents(el);
            range.collapse(false);

            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
        });
    };

    // context menu logic
    const handleDelete = () => {
        setBlocks((prevBlocks) =>
            prevBlocks.filter((block) => block.id !== id)
        );
    };

    return (
        <Draggable
            x={x}
            y={y}
            id={id}
            disableDrag={
                onEdge.top || onEdge.right || onEdge.bottom || onEdge.left ||
                onEdge.topLeft || onEdge.topRight || onEdge.bottomLeft || onEdge.bottomRight
            }
        >
            <ContextMenu>
                <ContextMenuTrigger>
                    <div
                        style={{
                            width: width,
                            height: height,
                            backgroundColor: "#f0f0f0",
                            border: "2px solid #ccc",
                            borderRadius: "24px",
                            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onMouseDown={handleEdgeDown}
                        onMouseMove={handleEdgeOver}
                        onDoubleClick={handleDoubleClick}
                        ref={blockRef}
                    ></div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                    <ContextMenuItem onSelect={handleAddLabel}>
                        Add label
                    </ContextMenuItem>
                    <ContextMenuItem onSelect={handleDelete}>
                        Delete
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </Draggable>
    );
};

export default Block;
