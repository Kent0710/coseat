'use client'

import { useRef } from "react";
import useBlocksStore from "@/store/use-blocks";

import { Square } from "lucide-react";
import ControlIcon from "./control-icon";

interface AddBlockControlProps {
    pan: { x: number; y: number };
    zoom: number;
}
const AddBlockControl : React.FC<AddBlockControlProps> = ({pan, zoom}) => {
    const counter = useRef(0)
    const {setBlocks} = useBlocksStore()

    const handleClick = () => {
        // Transform screen center to canvas coordinates
        const screenCenterX = window.innerWidth / 2;
        const screenCenterY = window.innerHeight / 2;

        const canvasX = (screenCenterX - pan.x) / zoom;
        const canvasY = (screenCenterY - pan.y) / zoom;

        setBlocks((prev) => [
            ...prev,
            {
                id: `block-${counter.current++}`,
                x: canvasX,
                y: canvasY,
                text: `Block ${counter.current}`,
                width: 100,
                height: 100,
            },
        ]);
    }
    
    return (
       <ControlIcon icon={Square} onClick={handleClick} />
    )
};

export default AddBlockControl;