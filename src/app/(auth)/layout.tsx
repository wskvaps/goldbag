import React from "react";

export const metadata = {
    title: "next.js",
    description: "Gen...",
};

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="zh-CN">
            <meta name="google" content="notranslate" />
            <body>{children}</body>
        </html>
    );
}
