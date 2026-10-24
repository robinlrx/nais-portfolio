import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type SanityDocument } from "next-sanity";
import Fallback from "@/app/components/Fallback";
import { PROJECTSPAGE_QUERY } from "@/constants/queries";
import { fetchQuery } from "@/lib/fetchQuery";

type Props = {
    params: Promise<{ locale: string }>;
};

export default function ProjectsPage({ params }: Props) {
	// ⚠️ Aucun "await params" ici : la page ne lit pas l'URL.
	// La promesse est passée telle quelle au composant dans Suspense.
	return (
		<main className="container mx-auto min-h-screen p-8 border mt-header border-amber-600">
			<Fallback>
				<ProjectsContent params={params} />
			</Fallback>
		</main>
	);
}

async function ProjectsContent({ params }: Props) {
	const { locale } = await params; // ✅ le await est maintenant DANS le Suspense

	if (!["en", "fr"].includes(locale)) {
		notFound();
	}

	const projects = await fetchQuery<SanityDocument[] | []>({
		query: PROJECTSPAGE_QUERY,
		params: { locale },
	});

	return (
		<>
			<h1 className="text-4xl font-bold mb-8 font-hago">
				{locale === "fr" ? "Projets" : "Projects"}
			</h1>

			<ul className="flex flex-col gap-y-4">
				{projects.map((project) => (
					<li className="hover:underline" key={project._id}>
						<Link href={`/${locale}/projects/${project.slug.current}`}>
							<h2 className="text-xl font-bold">{project.title?.[locale] ?? project.title?.[locale === "fr" ? "en" : "fr"]}</h2>
						</Link>
					</li>
				))}
			</ul>
		</>
	);
}
