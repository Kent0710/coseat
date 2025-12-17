export interface DraggableType {
    id: string;
    x: number;
    y: number;
}

export interface ChairType {
    id: string;
    x: number;
    y : number;
    name: string;
    isOccupied: boolean;
}

export interface BlockType {
    id: string;
    x : number;
    y : number;
    text: string;
    width: number;
    height: number;
}