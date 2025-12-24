import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default: "Coseat",
        template: "%s | Coseat",
    },
    description:
        "Coseat is a web app that allows event organizers to create personalized seating arrangements for events, easily shareable to attendees for seamless accommodation.",
    keywords: [
        "seating arrangement",
        "event planning",
        "event organizer",
        "seat management",
        "event seating",
        "seating chart",
        "event accommodation",
        "seating planner",
    ],
    authors: [{ name: "Coseat Team" }],
    creator: "Coseat",
    publisher: "Coseat",
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || "https://coseat.app"
    ),
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "/",
        title: "Coseat - Seamless Seating Arrangement for Events",
        description:
            "Create personalized seating arrangements for events, easily shareable to attendees for seamless accommodation.",
        siteName: "Coseat",
    },
    twitter: {
        card: "summary_large_image",
        title: "Coseat - Seamless Seating Arrangement for Events",
        description:
            "Create personalized seating arrangements for events, easily shareable to attendees for seamless accommodation.",
        creator: "@coseat",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                {children}
                <Toaster />
            </body>
        </html>
    );
}
