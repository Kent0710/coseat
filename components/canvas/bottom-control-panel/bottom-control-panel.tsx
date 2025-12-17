import ArmchairControlIcon from "./armchair-control-icon";
import ResetControlIcon from "./reset-control-icon";
import AddBlockControl from "./add-block-control";

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
        "
        >
            {/* Actual Container for the Controls */}
            <div className="flex items-center gap-2">
                <ArmchairControlIcon pan={pan} zoom={zoom} />
                <AddBlockControl pan={pan} zoom={zoom} />
                <ResetControlIcon />
                {/* <ControlIcon icon={MousePointer2} />
                <ControlIcon icon={Armchair} />
                <ControlIcon icon={Trash2} /> */}
            </div>
        </div>
    );
};

export default BottomControlPanel;