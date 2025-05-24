import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
	title: "Code Agent",
	description: "Code Agent",
	generator: "Code Agent",
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

