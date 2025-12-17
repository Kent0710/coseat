"use client";

import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { useRef, useState, useEffect } from "react";

import { Armchair, User } from "lucide-react";
import { Input } from "../ui/input";
import { twMerge } from "tailwind-merge";

interface ChairProps {
    className?: string;
    x: number;
    y: number;
    id: string;
}
const Chair: React.FC<ChairProps> = ({ className, x, y, id }) => {
    const [isAssigning, setIsAssigning] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [assignedName, setAssignedName] = useState("");
    const chairRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isAssigning) {
            // Cancel assignment if clicking outside the input
            if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
                setIsAssigning(false);
            }
            return;
        }
        e.preventDefault();
        setIsSelected(true);
        setIsDragging(true);
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
        setIsDragging(true);
    };

    useEffect(() => {
        if (!isDragging) return;

        const handleMouseMove = (e: MouseEvent) => {
            if (chairRef.current) {
                const newX = e.clientX - chairRef.current.offsetWidth / 2;
                const newY = e.clientY - chairRef.current.offsetHeight / 2;
                chairRef.current.style.left = `${newX}px`;
                chairRef.current.style.top = `${newY}px`;
            }
        };

        const handleTouchMove = (e: TouchEvent) => {
            if (chairRef.current && e.touches.length > 0) {
                const touch = e.touches[0];
                const newX = touch.clientX - chairRef.current.offsetWidth / 2;
                const newY = touch.clientY - chairRef.current.offsetHeight / 2;
                chairRef.current.style.left = `${newX}px`;
                chairRef.current.style.top = `${newY}px`;
            }
        };

        const handleEnd = () => {
            setIsDragging(false);
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
    }, [isDragging]);

    // Handle chair assignment
    const handleAssign = () => {
        setIsAssigning(true);
    }

    const handleAssignSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const value = e.currentTarget.value.trim();
            if (value) {
                setAssignedName(value);
            }
            setIsAssigning(false);
        }
    }

    const handleAssignBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.trim();
        if (value) {
            setAssignedName(value);
        }
        setIsAssigning(false);
    }

    // Auto-focus input when assigning
    useEffect(() => {
        if (isAssigning && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isAssigning]);

    // Handle clicks outside to deselect
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (chairRef.current && !chairRef.current.contains(e.target as Node)) {
                setIsSelected(false);
            }
        };

        if (isSelected) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => {
                document.removeEventListener("mousedown", handleClickOutside);
            };
        }
    }, [isSelected]);

    return (
        <ContextMenu>
            <ContextMenuTrigger>
                <div
                    id={id}
                    ref={chairRef}
                    className={twMerge(`flex flex-col items-center`, className)}
                    style={{
                        top: y,
                        left: x,
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
                        />
                    ) : assignedName ? (
                        <div className="flex items-center gap-1 mb-2 text-sm font-medium">
                            <User size={16} />
                            <span>{assignedName}</span>
                        </div>
                    ) : null}
                    <Armchair size={100} />
                </div>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem 
                    onSelect={handleAssign}
                >
                    Assign
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};

export default Chair;
