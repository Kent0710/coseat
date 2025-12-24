import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { customAlphabet } from "nanoid";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface FirestoreTimestamp {
    _seconds: number;
    _nanoseconds: number;
}

export function formatEventDate(
    timestamp: FirestoreTimestamp | Date | any
): string {
    if (!timestamp) return "";

    // Convert Firestore Timestamp to JS Date
    const date =
        timestamp instanceof Date
            ? timestamp
            : new Date(timestamp._seconds * 1000);

    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    })
        .format(date)
        .replace(/,/g, "")
        .replace(/\s(?=\d{1,2}:\d{2})/, " | ");
}

export const getEventIdOnParams = (pathname: string) => {
    return pathname.split("/")[2];
};

export const generateEventCode = () => {
    const alphabet = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const eventCode = customAlphabet(alphabet, 6);
    return eventCode();
};
