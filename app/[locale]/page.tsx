
import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Navbar from "@/app/components/Navbar";
import LanguageSwitcher from "@/app/components/LanguageSwitcher";

type Props = {
	params: Promise<{ locale: string }>;
};

const PROJECTS_QUERY = `*[
	_type == "project"
	&& language == $locale
	&& defined(slug.current)
] {
	_id,
	title,
	slug
}`;

const options = { next: { revalidate: 30 } };

export default function Home({ params }: Props) {
	return (
		<Suspense fallback={<div className="min-h-screen p-8" />}>
			<HomeContent params={params} />
		</Suspense>
	);
}

async function HomeContent({ params }: Props) {
	const { locale } = await params;

	if (!["en", "fr"].includes(locale)) {
		notFound();
	}

	const projects = await client.fetch<SanityDocument[]>(
		PROJECTS_QUERY,
		{ locale },
		options
	);

	return (
		<>
			<Navbar />
			<main className="container mx-auto min-h-screen p-8 border border-amber-600">
				<h1 className="text-4xl font-bold mb-8 font-hago">
				{locale === "fr" ? "Projets" : "Projects"}
				</h1>

				<ul className="flex flex-col gap-y-4">
					{projects.map((project) => (
						<li className="hover:underline" key={project._id}>
						<Link href={`/${locale}/projects/${project.slug.current}`}>
							<h2 className="text-xl font-bold">{project.title}</h2>
						</Link>
						</li>
					))}
				</ul>
			</main>
		</>
	);
}
