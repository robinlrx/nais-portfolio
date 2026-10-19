import type { Metadata } from "next";
import "./globals.css";
import { openSans, hago } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Naïs Hoang - portfolio",
  description: "I'm specialized in creating visually impactful, dynamic and colorful 2D animation videos! Creative direction.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${openSans.className} ${hago.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">{children}</body>
		</html>
	);
}
