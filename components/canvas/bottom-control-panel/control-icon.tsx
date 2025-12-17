import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

interface ControlIconProps {
    icon: ForwardRefExoticComponent<
        Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
    >;
    onClick?: () => void;
}

const ControlIcon: React.FC<ControlIconProps> = ({ icon: Icon, onClick }) => {
    return (
        <button
            onClick={onClick}
            className="hover:bg-neutral-200 hover:cursor-pointer p-2 rounded-2xl"
        >
            <Icon size={30} />
        </button>
    );
};

export default ControlIcon;