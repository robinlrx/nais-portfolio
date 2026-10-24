
import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/client";
import Skeleton from "@/app/components/Skeleton";
import { urlFor } from '@/lib/imageUrl';
import { Image } from "next-sanity/image";
import Fallback from "@/app/components/Fallback";
import { PROJECT_QUERY } from "@/constants/queries";
import { fetchQuery } from "@/lib/fetchQuery";

type PageProps = {
	params: Promise<{ locale: string; slug: string }>;
};

export default function ProjectPage({ params }: PageProps) {
	return (
		<Fallback fallback={<Skeleton />}>
			<ProjectContent params={params} />
		</Fallback>
	);
}

async function ProjectContent({ params }: PageProps) {
	const { locale, slug } = await params;

	if (!["en", "fr"].includes(locale)) {
		notFound();
	}

	const project = await fetchQuery<SanityDocument | null>({
		query: PROJECT_QUERY,
		params: { slug, locale },
	});

	if (!project) {
		notFound();
	}

	const otherLocale = locale === "fr" ? "en" : "fr";

	const localizedTitle = project.title?.[locale] ?? project.title?.[otherLocale];
	const localizedBody = project.body?.[locale] ?? project.body?.[otherLocale];
	const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];

	return (
		<>
			<main className="container mx-auto min-h-screen p-8 flex flex-col gap-4 mt-[80px]">
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
								<Image key={image._key ?? index} src={imageUrl} alt={`${localizedTitle ?? "Project"} - image ${index + 1}`} width={800} height={600} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-64 w-full object-cover"/>
							);
						})}
					</div>
				)}
			</main>
		</>
	);
}
