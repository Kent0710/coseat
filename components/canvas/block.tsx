import { BlockType } from "@/lib/types";
import Draggable from "./draggable";
import { Square } from "lucide-react";

interface BlockProps extends BlockType {
       zoom: number;
    pan: { x: number; y: number };
    className? : string;
}

const Block : React.FC<BlockProps> = ({
    id,
    x,
    y,
}) => {
    return (
        <Draggable
            x={x}
            y={y}
            id={id}
        >
            <Square size={50} />
        </Draggable>

    )
};

export default Block;