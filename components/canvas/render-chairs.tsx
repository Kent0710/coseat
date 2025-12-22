"use client";

import { redirect, usePathname } from "next/navigation";
import useChairsStore from "@/store/use-chairs";
import useZoomPanStore from "@/store/use-zoom-pan";
import { useEffect } from "react";

import Chair from "./chair";
import { toast } from "sonner";
import { getEventIdOnParams } from "@/lib/utils";
import { getChairsAction } from "@/actions/chair/get-chairs-action";

const RenderChairs = () => {
    const { zoom, pan } = useZoomPanStore();
    const { chairs, setChairs } = useChairsStore();

    const pathname = usePathname();

    useEffect(() => {
        const getChairs = async () => {
            const eventId = getEventIdOnParams(pathname);

            if (!eventId) {
                toast.error("Event not found.");
                redirect("/home");
            }

            const fetchedChairs = await getChairsAction(eventId);

            setChairs(fetchedChairs);
        };

        getChairs();
    }, [pathname, setChairs])

    return chairs.map((chair) => (
        <Chair
            key={chair.id}
            className="absolute"
            x={chair.x}
            y={chair.y}
            id={chair.id}
            zoom={zoom}
            pan={pan}
        />
    ));
};

export default RenderChairs;
