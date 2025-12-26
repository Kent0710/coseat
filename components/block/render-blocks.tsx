"use client";

import Block from "../block/block";

import { redirect, usePathname } from "next/navigation";
import useZoomPanStore from "@/store/use-zoom-pan";
import useBlocksStore from "@/store/use-blocks";
import { getEventIdOnParams } from "@/lib/utils";
import { useEffect } from "react";
import { toast } from "sonner";
import { getBlocksAction } from "@/actions/block/get-blocks-action";

const RenderBlocks = () => {
    const eventId = getEventIdOnParams(usePathname());

    const { zoom, pan } = useZoomPanStore();
    const { blocks, setBlocks } = useBlocksStore();

    useEffect(() => {
        const getBlocks = async () => {
            if (!eventId) {
                toast.error('Event not found');
                redirect('/home')
                return;
            };

            const fetchedBlocks = await getBlocksAction(eventId);

            setBlocks(fetchedBlocks)
        };

        getBlocks();
    }, [eventId, setBlocks]);

    return blocks.map((block) => (
        <Block
            key={block.id}
            className="absolute"
            width={block.width}
            height={block.height}
            x={block.x}
            y={block.y}
            id={block.id}
            zoom={zoom}
            pan={pan}
            text={block.text}
            eventId={eventId}
        />
    ));
};

export default RenderBlocks;