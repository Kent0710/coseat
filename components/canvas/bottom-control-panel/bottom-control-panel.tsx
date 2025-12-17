import ArmchairControlIcon from "./armchair-control-icon";

const BottomControlPanel = () => {
    return (
        <div
            className="
            bg-white border shadow-sm rounded-2xl w-fit p-4
            absolute bottom-4 left-1/2 -translate-x-1/2
        "
        >
            {/* Actual Container for the Controls */}
            <div className="flex items-center gap-2">
                <ArmchairControlIcon />
                {/* <ControlIcon icon={MousePointer2} />
                <ControlIcon icon={Armchair} />
                <ControlIcon icon={Trash2} /> */}
            </div>
        </div>
    );
};

export default BottomControlPanel;