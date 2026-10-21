"use client";

import { useState } from "react";
import Link from "next/link";

type LanguageSwitcherProps = {
	locale: "fr" | "en";
	switchPath: string;
};

const LanguageSwitcher = ({locale, switchPath}: LanguageSwitcherProps) => {

	const [open, setOpen] = useState(false);
	// Calcule le chemin pour chaque langue
	// Si on est déjà en FR, le lien FR reste sur la page courante, le lien EN va vers switchPath
	const frHref = locale === "fr" ? "#" : switchPath;
	const enHref = locale === "en" ? "#" : switchPath;

	return (
		<div className="text-white bg-black rounded-full block relative h-16 px-4 cursor-pointer">

			<div className="flex items-center justify-center w-full h-full ml-1 p-2 relative z-10" onClick={() => setOpen(!open)}>
				<p>{locale.toLocaleUpperCase()}</p>
				<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
					<path fill="currentColor" d="m8.71 11.71l2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71"/>
				</svg>
			</div>

			<div className={`${open ? 'visible scale-100 opacity-100' : 'invisible scale-95 opacity-0'} flex flex-col absolute z-0 right-0 top-9 w-full pt-7 bg-inherit rounded-b-4xl transition-all duration-200`}>

				<Link href={frHref} className="text-white p-2 text-center" onClick={() => setOpen(false)}>
					{locale === "en" ? "French" : "Français"}
				</Link>
				<hr />
				<Link href={enHref} className="text-white px-2 py-4 text-center" onClick={() => setOpen(false)}>
					{locale === "en" ? "English" : "Anglais"}
				</Link>

			</div>
		</div>
	);
};

export default LanguageSwitcher;
