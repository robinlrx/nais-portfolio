
import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/client";
import Skeleton from "@/app/components/Skeleton";
import { urlFor } from '@/lib/imageUrl';
import { Image } from "next-sanity/image";

const PROJECT_QUERY = `*[
  _type == "project" &&
  slug.current == $slug
][0] {
  ...
}`;

const options = { next: { revalidate: 30 } };

type PageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

export default function ProjectPage({ params }: PageProps) {
	return (
		<Suspense fallback={<Skeleton />}>
			<ProjectContent params={params} />
		</Suspense>
	);
}

async function ProjectContent({ params }: PageProps) {
	const { locale, slug } = await params;

	if (!["en", "fr"].includes(locale)) {
		notFound();
	}

	const project = await client.fetch<SanityDocument | null>(
		PROJECT_QUERY,
		{ slug, locale },
		options
	);

	if (!project) {
		notFound();
	}

	const otherLocale = locale === "fr" ? "en" : "fr";

	const localizedTitle = project.title?.[locale] ?? project.title?.[otherLocale];
	const localizedBody = project.body?.[locale] ?? project.body?.[otherLocale];
	const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];

	return (
		<>
			<main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
				<Link href={`/${locale}/projects`} className="hover:underline">
					{locale === "fr" ? "← Retour aux projets" : "← Back to projects"}
				</Link>

				<h1 className="text-4xl font-bold mb-8">{localizedTitle}</h1>

				<div className="prose">
					<PortableText value={localizedBody} />
				</div>

				{galleryImages.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{galleryImages.map((image, index) => {
							const imageUrl = urlFor(image)?.url();
							if (!imageUrl) return null;

							return (
								<Image key={image._key ?? index} src={imageUrl} alt={`${localizedTitle ?? "Project"} - image ${index + 1}`} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-64 w-full rounded-xl object-cover"/>
							);
						})}
					</div>
				)}
			</main>
		</>
	);
}
