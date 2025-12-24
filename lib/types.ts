export interface EventType {
    id: string;
    title: string;
    createdAt: {
        _seconds: number;
        _nanoseconds: number;
    };
    code: string;
}

export interface DraggableType {
    id: string;
    x: number;
    y: number;
}

export interface ChairType {
    id: string;
    x: number;
    y: number;
    name: string;
}

export interface BlockType {
    id: string;
    x: number;
    y: number;
    text: string;
    width: number;
    height: number;
}
