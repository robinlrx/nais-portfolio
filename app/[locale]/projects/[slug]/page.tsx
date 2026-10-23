
import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/client";
import Skeleton from "@/app/components/Skeleton";
import { urlFor } from '@/lib/imageUrl';
import { getTranslatedSlug } from "@/lib/getTranslatedSlug";
import { Image } from "next-sanity/image";
import Navbar from "@/app/components/Navbar";

const PROJECT_QUERY = `*[
  _type == "project" &&
  language == $locale &&
  slug.current == $slug
][0] {
  ...,
  "translations": *[
    _type == "translation.metadata" &&
    references(^._id)
  ][0].translations[].value-> {
    language,
    "slug": slug.current
  }
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

	const translatedSlug = await getTranslatedSlug({
		slug,
		locale,
		type: "project",
	});

	const switchPathOverride = translatedSlug ? `/${otherLocale}/projects/${translatedSlug}` : `/${otherLocale}`;

	const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];

	return (
		<>
			<Navbar switchPathOverride={switchPathOverride} />
			<main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
				<Link href={`/${locale}`} className="hover:underline">
					{locale === "fr" ? "← Retour aux projets" : "← Back to projects"}
				</Link>

				<h1 className="text-4xl font-bold mb-8">{project.title}</h1>

				<div className="prose">
					{Array.isArray(project.body) && (
						<PortableText value={project.body} />
					)}
				</div>

				{galleryImages.length > 0 && (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
						{galleryImages.map((image, index) => {
							const imageUrl = urlFor(image)?.url();
							if (!imageUrl) return null;

							return (
								<Image key={image._key ?? index} src={imageUrl} alt={`${project.title ?? "Project"} - image ${index + 1}`} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-64 w-full object-cover"/>
							);
						})}
					</div>
				)}
			</main>
		</>
	);
}
