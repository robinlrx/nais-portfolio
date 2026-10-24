import type { Metadata } from "next";
import "./globals.css";
import { openSans, hago } from "@/lib/fonts";
import ConditionalNavbar from "@/app/components/ConditionalNavbar";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Naïs Hoang - portfolio",
  description: "I'm specialized in creating visually impactful, dynamic and colorful 2D animation videos! Creative direction.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html lang="en" className={`${openSans.className} ${hago.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<Suspense>
					<ConditionalNavbar />
				</Suspense>
				{children}
			</body>
		</html>
	);
}

// Fallback statique : même hauteur/structure que la Navbar
// pour éviter un saut de layout au chargement
function NavbarFallback() {
	return (
		<nav className="navbar" aria-hidden>
		<div className="nav-links">
			<span className="nav-link">Accueil</span>
			<span className="nav-link">Projets</span>
		</div>
		</nav>
	);
}
