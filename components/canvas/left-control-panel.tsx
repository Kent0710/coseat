import { ChevronLeft, Settings2 } from "lucide-react";
import { Button } from "../ui/button";

const LeftControlPanel = () => {
    return (
        <div className="bg-white border shadow-sm rounded-2xl w-[20rem] p-4">
            <section className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <ChevronLeft />
                    <p className="text-lg font-medium"> coseat </p>
                </div>
                <Button variant={"outline"}>
                    <Settings2 />
                    Preferences
                </Button>
            </section>
        </div>
    );
};

export default LeftControlPanel;
