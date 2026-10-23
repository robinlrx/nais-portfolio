"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type NavbarProps = {
	switchPathOverride?: string;
};


const navLinks = {
	en: [
		{ href: "/showreel", label: "Showreel" },
		{ href: "/projects", label: "Projects" },
		{ href: "/processus-creatif", label: "Creative process" },
		{ href: "/actualites", label: "News" },
		{ href: "/a-propos", label: "About me" },
	],
	fr: [
		{ href: "/showreel", label: "Showreel" },
		{ href: "/projects", label: "Projets" },
		{ href: "/processus-creatif", label: "Processus créatif" },
		{ href: "/actualites", label: "Actualités" },
		{ href: "/a-propos", label: "À propos de moi" },
	],
};

export default function Navbar({ switchPathOverride }: NavbarProps) {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	const segments = pathname.split("/");
	const locale = segments[1] === "fr" ? "fr" : "en";
	const otherLocale = locale === "en" ? "fr" : "en";
	const links = navLinks[locale];

	// Retire la langue actuelle pour construire l'URL de l'autre langue.
	const pathWithoutLocale = "/" + segments.slice(2).join("/");
	const switchPath = switchPathOverride ?? (pathWithoutLocale === "/" ? `/${otherLocale}` : `/${otherLocale}${pathWithoutLocale}`);

	const localizedHref = (href: string) => {
		const cleanHref = href.startsWith("/") ? href : `/${href}`;
		return `/${locale}${cleanHref}`;
	};

	const contactLabel = locale === "fr" ? "J'ai un brief à proposer !" : "Have a project in mind?";

	return (
		<header className="absolute top-0 z-999 w-full px-3 pt-3 sm:px-4 sm:pt-4 font-hago">
			<div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4">
				<nav className="flex h-16 items-center overflow-hidden rounded-full border border-white bg-black grow">
					{/* Logo */}
					<Link href={`/${locale}`} aria-label="Nais Hoang – accueil" className="flex h-full shrink-0 items-center border-r border-white px-5 sm:px-8">
						<Image src="/logo_nais-hoang_blanc.svg" alt="Nais Hoang" width={140} height={40} unoptimized priority className="h-8 w-auto xl:h-10"/>
					</Link>

					{/* Navigation desktop */}
					<ul className="hidden flex-1 items-center justify-between px-4 xl:flex">
						{links.map(({ href, label }) => {

							const fullHref = localizedHref(href);
							const isActive =pathname === fullHref || pathname.startsWith(`${fullHref}/`);

							return (
								<li key={href}>
									<Link href={fullHref} className={`rounded-full px-4 py-2 text-lg font-bold transition-colors duration-200 ${isActive ? "bg-yellow-400 text-black" 
									: "text-white hover:text-yellow-400"}`}>
										{label}
									</Link>
								</li>
							);
						})}
					</ul>

					{/* CTA desktop */}
					<Link href={localizedHref("/contact")} className="hidden shrink-0 rounded-full bg-white px-5 py-4 text-lg font-bold text-blue-600 xl:block">{contactLabel}</Link>

					{/* burger icon*/}
					<button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:text-yellow-400 xl:hidden">
						<span className="relative block h-4 w-5" aria-hidden="true">
							<span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}/>
							<span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}/>
							<span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}/>
						</span>
					</button>
				</nav>

				{/* langue switcher */}
				<LanguageSwitcher locale={locale} switchPath={switchPath} />

				{/* Menu mobile */}
				<div id="mobile-menu" className={`absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-white bg-black p-4 transition-all duration-200 xl:hidden ${open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}`}>
					<ul className="flex flex-col gap-1">
						{links.map(({ href, label }) => {
						const fullHref = localizedHref(href);
						const isActive =
							pathname === fullHref || pathname.startsWith(`${fullHref}/`);

						return (
							<li key={href}>
								<Link onClick={() => setOpen(false)} href={fullHref} className={`block rounded-full px-5 py-3 text-xl font-bold transition-colors duration-200 ${isActive ? "bg-yellow-400 text-black" : "text-white hover:text-yellow-400"}`}>
									{label}
								</Link>
							</li>
						);
						})}
					</ul>

					{/* CTA mobile */}
					<Link onClick={() => setOpen(false)} href={localizedHref("/contact")} className="mt-4 block rounded-full bg-white px-6 py-4 text-center text-xl font-bold text-blue-600">{contactLabel}</Link>
				</div>
			</div>
		</header>
	);
}