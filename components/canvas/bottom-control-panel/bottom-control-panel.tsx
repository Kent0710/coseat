'use client'

import ResetControlIcon from "./reset-control-icon";
import AddBlockControl from "./add-block-control";
import AddChairControl from "./add-chair-control";

interface BottomControlPanelProps {
    pan: { x: number; y: number };
    zoom: number;
}

const BottomControlPanel: React.FC<BottomControlPanelProps> = ({ pan, zoom }) => {
    return (
        <div
            className="
            bg-white border shadow-sm rounded-2xl w-fit p-4
            absolute bottom-4 left-1/2 -translate-x-1/2
            z-50
            animate-in slide-in-from-bottom-10 fade-in duration-300
        "
        >
            {/* Actual Container for the Controls */}
            <div className="flex items-center gap-2">
                <AddChairControl pan={pan} zoom={zoom} />
                <AddBlockControl pan={pan} zoom={zoom} />
                <ResetControlIcon />
            </div>
        </div>
    );
};

export default BottomControlPanel;