import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
	title: "AI Design System Agents",
	description: "AI Design System Agents",
	generator: "AI Design System Agents",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<html lang="en">
			<body>
				{children}
				<Toaster />
			</body>
		</html>
	);
}

