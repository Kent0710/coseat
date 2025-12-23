"use client";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useRef, useState, useEffect } from "react";

import {
    Armchair,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    ChevronUp,
    User,
} from "lucide-react";
import { Input } from "../ui/input";
import { twMerge } from "tailwind-merge";
import useChairsStore from "@/store/use-chairs";
import { toast } from "sonner";
import { deleteChairByIdAction } from "@/actions/chair/delete-chair-by-id-action";
import { updateChairAction } from "@/actions/chair/update-chair-action";
import { useDebouncedCallback } from "@/hooks/use-debounced-callback";

interface ChairProps {
    className?: string;
    x: number;
    y: number;
    id: string;
    zoom: number;
    pan: { x: number; y: number };
    eventId: string;
}
const Chair: React.FC<ChairProps> = ({
    className,
    x,
    y,
    id,
    zoom,
    pan,
    eventId,
}) => {
    const [isAssigning, setIsAssigning] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [assignedName, setAssignedName] = useState("");
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [currentPosition, setCurrentPosition] = useState({ x, y });
    const [lastDirection, setLastDirection] = useState<
        "right" | "left" | "up" | "down" | null
    >(null);
    const [lastAddedPosition, setLastAddedPosition] = useState({ x: 0, y: 0 });

    const chairRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // The chairs store
    const { chairs, setChairs } = useChairsStore();

    // Debounced update function to prevent rapid database calls
    const debouncedUpdateChair = useDebouncedCallback(async () => {
        await updateChairAction(
            id,
            eventId,
            currentPosition.x,
            currentPosition.y
        );
        toast.success("Chair position updated.");
    }, 1000);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isAssigning) {
            // Cancel assignment if clicking outside the input
            if (
                inputRef.current &&
                !inputRef.current.contains(e.target as Node)
            ) {
                setIsAssigning(false);
            }
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        setIsSelected(true);
        setIsDragging(true);

        // Calculate offset in canvas coordinates
        const canvasMouseX = (e.clientX - pan.x) / zoom;
        const canvasMouseY = (e.clientY - pan.y) / zoom;

        setDragOffset({
            x: canvasMouseX - currentPosition.x,
            y: canvasMouseY - currentPosition.y,
        });
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        if (isAssigning) {
            // Cancel assignment if touching outside the input
            if (inputRef.current && e.target !== inputRef.current) {
                setIsAssigning(false);
            }
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);

        // Calculate offset in canvas coordinates for touch
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const canvasMouseX = (touch.clientX - pan.x) / zoom;
            const canvasMouseY = (touch.clientY - pan.y) / zoom;

            setDragOffset({
                x: canvasMouseX - currentPosition.x,
                y: canvasMouseY - currentPosition.y,
            });
        }
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            // Transform screen coordinates to canvas coordinates
            const canvasMouseX = (e.clientX - pan.x) / zoom;
            const canvasMouseY = (e.clientY - pan.y) / zoom;

            // Subtract the offset to get chair position
            const canvasX = canvasMouseX - dragOffset.x;
            const canvasY = canvasMouseY - dragOffset.y;

            // Update local position state for smooth rendering
            setCurrentPosition({ x: canvasX, y: canvasY });
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length > 0) {
                const touch = e.touches[0];
                // Transform screen coordinates to canvas coordinates
                const canvasMouseX = (touch.clientX - pan.x) / zoom;
                const canvasMouseY = (touch.clientY - pan.y) / zoom;

                // Subtract the offset to get chair position
                const canvasX = canvasMouseX - dragOffset.x;
                const canvasY = canvasMouseY - dragOffset.y;

                // Update local position state for smooth rendering
                setCurrentPosition({ x: canvasX, y: canvasY });
            }
        };

        const handleEnd = async () => {
            setIsDragging(false);
            // Update the store with final position when drag ends
            setChairs((prev) =>
                prev.map((chair) =>
                    chair.id === id
                        ? {
                              ...chair,
                              x: currentPosition.x,
                              y: currentPosition.y,
                          }
                        : chair
                )
            );

            // Debounce the database update to prevent rapid calls
            debouncedUpdateChair();
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleEnd);
        document.addEventListener("touchmove", handleTouchMove);
        document.addEventListener("touchend", handleEnd);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleEnd);
            document.removeEventListener("touchmove", handleTouchMove);
            document.removeEventListener("touchend", handleEnd);
        };
    }, [isDragging, zoom, pan, dragOffset, id, setChairs, currentPosition, debouncedUpdateChair]);

    // Handle chair assignment
    const handleAssign = () => {
        setIsAssigning(true);
    };

    const handleAssignSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            const value = e.currentTarget.value.trim();
            if (value) {
                setAssignedName(value);
            }
            setIsAssigning(false);
        }
    };

    const handleAssignBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        if (value) {
            setAssignedName(value);
        }
        setIsAssigning(false);
    };

    // Auto-focus input when assigning
    useEffect(() => {
        if (isAssigning && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAssigning]);

    // Handle clicks outside to deselect
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                chairRef.current &&
                !chairRef.current.contains(e.target as Node)
            ) {
                setIsSelected(false);
                // Reset the offset tracking when deselecting
                setLastDirection(null);
                setLastAddedPosition({ x: 0, y: 0 });
            }
        };

        if (isSelected) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isSelected]);

    const addChair = (direction: "right" | "left" | "up" | "down") => {
        const offset = 140;

        let x = 0;
        let y = 0;

        if (chairRef.current) {
            // If clicking the same direction consecutively, use last added position
            // Otherwise, use the original chair's position
            const baseX =
                lastDirection === direction && lastAddedPosition.x !== 0
                    ? lastAddedPosition.x
                    : chairRef.current.offsetLeft;
            const baseY =
                lastDirection === direction && lastAddedPosition.y !== 0
                    ? lastAddedPosition.y
                    : chairRef.current.offsetTop;

            switch (direction) {
                case "right":
                    x = baseX + offset;
                    y = baseY;
                    break;
                case "left":
                    x = baseX - offset;
                    y = baseY;
                    break;
                case "up":
                    x = baseX;
                    y = baseY - offset;
                    break;
                case "down":
                    x = baseX;
                    y = baseY + offset;
                    break;
            }

            // Update last direction and position
            setLastDirection(direction);
            setLastAddedPosition({ x, y });

            setChairs((prev) => [
                ...prev,
                {
                    id: `chair-${Date.now()}`,
                    x: x,
                    y: y,
                    name: `Chair ${prev.length + 1}`,
                    isOccupied: false,
                },
            ]);
        }
    };

    // Prevent drag when clicking on interactive elements
    const handleChevronClick = (e: React.MouseEvent, action: () => void) => {
        e.stopPropagation();
        action();
    };

    // Handle chair deletion
    const handleDelete = async () => {
        // snapshot
        const previousChairs = chairs;

        // optimistic update
        setChairs((prev) => prev.filter((chair) => chair.id !== id));

        const res = await deleteChairByIdAction(eventId, id);

        if (!res.success) {
            setChairs(previousChairs);
            toast.error("Failed to delete chair. Please try again.");
            return;
        }

        toast.success("Chair deleted.");
    };

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    id={id}
                    ref={chairRef}
                    className={twMerge(`flex flex-col items-center`, className)}
                    style={{
                        top: currentPosition.y,
                        left: currentPosition.x,
                        position: "absolute",
                        cursor: isDragging ? "grabbing" : "grab",
                        userSelect: "none",
                        border: isSelected ? "2px dashed blue" : "none",
                        borderRadius: "16px",
                        padding: "4px",
                    }}
                    onMouseDown={handleMouseDown}
                    onTouchStart={handleTouchStart}
                >
                    {isAssigning ? (
                        <Input
                            ref={inputRef}
                            placeholder="Enter name..."
                            onKeyDown={handleAssignSubmit}
                            onBlur={handleAssignBlur}
                            className="mb-2"
                            onMouseDown={(e) => e.stopPropagation()}
                            onTouchStart={(e) => e.stopPropagation()}
                        />
                    ) : assignedName ? (
                        <div className="flex items-center gap-1 mb-2 text-sm font-medium">
                            <User size={16} />
                            <span>{assignedName}</span>
                        </div>
                    ) : null}
                    <Armchair size={100} />
                    {isSelected && !isDragging && (
                        <div className="absolute">
                            <ChevronRight
                                className="absolute right-[-6rem] top-[2rem] bg-blue-600 rounded-full text-white cursor-pointer"
                                size={30}
                                onClick={(e) =>
                                    handleChevronClick(e, () =>
                                        addChair("right")
                                    )
                                }
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                            />
                            <ChevronLeft
                                className="absolute left-[-6rem] top-[2rem] bg-blue-600 rounded-full text-white cursor-pointer"
                                size={30}
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onClick={(e) =>
                                    handleChevronClick(e, () =>
                                        addChair("left")
                                    )
                                }
                            />
                            <ChevronUp
                                className="absolute top-[-3rem] right-[-1rem] bg-blue-600 rounded-full text-white cursor-pointer"
                                size={30}
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onClick={(e) =>
                                    handleChevronClick(e, () => addChair("up"))
                                }
                            />
                            <ChevronDown
                                className="absolute bottom-[-9rem] right-[-1rem] bg-blue-600 rounded-full text-white cursor-pointer"
                                size={30}
                                onMouseDown={(e) => e.stopPropagation()}
                                onTouchStart={(e) => e.stopPropagation()}
                                onClick={(e) =>
                                    handleChevronClick(e, () =>
                                        addChair("down")
                                    )
                                }
                            />
                        </div>
                    )}
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onSelect={handleAssign}>
                    Assign
                </ContextMenuItem>
                <ContextMenuItem onSelect={handleDelete}>
                    Delete
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default Chair;
