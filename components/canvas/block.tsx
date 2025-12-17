import { BlockType } from "@/lib/types";
import Draggable from "./draggable";

interface BlockProps extends BlockType {
    zoom: number;
    pan: { x: number; y: number };
    className? : string;
}

const Block : React.FC<BlockProps> = ({
    id,
    x,
    y,
    width,
    height,
}) => {


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
            >
            </div>
        </Draggable>

    )
};

export default Block;