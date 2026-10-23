// app/components/ConditionalNavbar.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";

export default function ConditionalNavbar() {
    const pathname = usePathname();

    // Cette regex détecte /projects/... avec ou sans préfixe de langue (ex: /projects/foo ou /fr/projects/foo)
    // à condition qu'il y ait bien un slug après /projects/
    const isProjectDetailPage = /^\/([a-z]{2}\/)?projects\/.+/.test(pathname);

	const isAdminPage = pathname.startsWith("/admin");

    if (isProjectDetailPage || isAdminPage) {
        return null;
    }

    return <Navbar />;
}