import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
    title: "Gudang Kiln - Warehouse Management System",
    description: "Production-ready material warehouse management system",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body className={`${plusJakartaSans.variable} font-sans`}>
                {children}
            </body>
        </html>
    );
}
