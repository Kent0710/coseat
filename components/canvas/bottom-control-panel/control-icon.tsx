import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface ControlIconProps {
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    onClick?: () => void;
    keyShortcut? : string;
}

const ControlIcon: React.FC<ControlIconProps> = ({ icon: Icon, onClick, keyShortcut }) => {
    return (
        <button
            onClick={onClick}
            className="hover:bg-neutral-200 hover:cursor-pointer p-2 rounded-2xl relative"
        >
            <Icon size={30} />
            {keyShortcut && (
                <span className="absolute bottom-[-5] right-1 text-xs text-muted-foreground font-semibold">
                    {keyShortcut.toUpperCase()}
                </span>
            )}
        </button>
    );
};

export default ControlIcon;