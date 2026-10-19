"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
	{ href: "/showreel", label: "Showreel" },
	{ href: "/projets", label: "Projets" },
	{ href: "/processus-creatif", label: "Processus créatif" },
	{ href: "/actualites", label: "Actualités" },
	{ href: "/a-propos", label: "À propos de moi" },
];

export default function Navbar() {
	const pathname = usePathname();
	const [open, setOpen] = useState(false);

	return (
		<header className="sticky top-0 z-50 w-full px-3 pt-3 sm:px-4 sm:pt-4 font-hago">
			<div className="relative mx-auto max-w-7xl">
				{/* desktop */}
				<nav aria-label="Navigation principale" className="flex h-16 items-center overflow-hidden rounded-full bg-black border-1 border-white">
					{/* logo */}
					<Link href="/" aria-label="Nais Hoang – accueil" className="flex h-full shrink-0 items-center border-r border-white px-5 sm:px-8">
						<Image src="logo_nais-hoang_blanc.svg" alt="Nais Hoang" width={140} height={40} unoptimized priority className="h-8 w-auto xl:h-10" />
					</Link>

					{/* links */}
					<ul className="hidden flex-1 items-center justify-between px-8 xl:flex">
						{links.map(({ href, label }) => {
						const isActive = pathname === href;
						return (
							<li key={href}>
								<Link href={href} aria-current={isActive ? "page" : undefined} className={`rounded-full px-5 py-2 text-xl font-bold transition-colors duration-200 
								${isActive ? "bg-yellow-400 text-black" : "text-white hover:text-yellow-400"}`}>
									{label}
								</Link>
							</li>
						);
						})}
					</ul>

					{/* CTA desktop */}
					<Link href="/contact" className="hidden shrink-0 rounded-full bg-white px-8 py-4 text-lg font-bold text-blue-600 transition-colors duration-200 xl:block">
						J&apos;ai un brief à proposer !
					</Link>

					{/* burger menu icon */}
					<button
						type="button"
						onClick={() => setOpen((value: boolean) => !value)}
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
						className="ml-auto mr-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-colors hover:text-yellow-400 xl:hidden"
					>
						<span className="relative block h-4 w-5" aria-hidden="true">
							<span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"}`}/>
							<span className={`absolute left-0 top-1/2 block h-0.5 w-5 -translate-y-1/2 bg-current transition-opacity duration-200 ${open ? "opacity-0" : "opacity-100"}`}/>
							<span className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ${open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"}`}/>
						</span>
					</button>
				</nav>

				{/* mobile */}
				<div id="mobile-menu" className={`absolute inset-x-0 top-full mt-2 origin-top rounded-3xl border border-white bg-black p-4 transition-all duration-200 xl:hidden ${open ? "visible scale-100 opacity-100" : "invisible scale-95 opacity-0"}`}>
					<ul className="flex flex-col gap-1">
						{links.map(({ href, label }) => {
							const isActive = pathname === href;
							return (
								<li key={href}>
									<Link onClick={() => setOpen(false)} href={href} aria-current={isActive ? "page" : undefined}
									className={`block rounded-full px-5 py-3 text-xl font-bold transition-colors duration-200 ${
									isActive ? "bg-yellow-400 text-black" : "text-white hover:text-yellow-400"}`}>
										{label}
									</Link>
								</li>
							);
						})}
					</ul>
					
					{/* CTA mobile */}
					<Link onClick={() => setOpen(false)} href="/contact" className="mt-4 block rounded-full bg-indigo-50 px-6 py-4 text-center text-xl font-bold text-blue-600 transition-colors duration-200 hover:bg-white">
						J&apos;ai un brief à proposer !
					</Link>
				</div>
			</div>
		</header>
	);
}