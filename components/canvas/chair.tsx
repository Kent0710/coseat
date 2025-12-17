'use client'

import { useRef, useState, useEffect } from "react";

import { Armchair } from "lucide-react";

interface ChairProps {
    className? : string;
    x: number;
    y: number;
    id: string;
}
const Chair : React.FC<ChairProps> = ({className, x, y, id}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const chairRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsSelected(true);
        setIsDragging(true);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
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
            setIsSelected(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleEnd);
        document.addEventListener('touchmove', handleTouchMove);
        document.addEventListener('touchend', handleEnd);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleEnd);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleEnd);
        };
    }, [isDragging]);


    return (
        <div
            id={id}
            ref={chairRef}
            className={className}
            style={{ 
                top: y, 
                left: x, 
                position: 'absolute',
                cursor: isDragging ? 'grabbing' : 'grab',
                userSelect: 'none',
                border: isSelected ? '2px dashed blue' : 'none',
                borderRadius: '16px',
                padding: '4px',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
        >
            <Armchair size={100} />
        </div>
    )
};

export default Chair;