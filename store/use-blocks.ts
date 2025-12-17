import { BlockType } from "@/lib/types";

import { create } from "zustand";

const useBlocksStore = create<{
    blocks: BlockType[];
    setBlocks: (
        blocks: BlockType[] | ((prev: BlockType[]) => BlockType[])
    ) => void;
}>((set) => ({
    blocks: [],
    setBlocks: (blocks) =>
        set((prevState) => ({
            blocks:
                typeof blocks === "function"
                    ? blocks(prevState.blocks)
                    : blocks,
        })),
}));

export default useBlocksStore