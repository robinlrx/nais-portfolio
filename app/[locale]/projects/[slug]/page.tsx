import { PortableText, type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import Link from "next/link";
import Skeleton from "@/app/components/Skeleton";
import { urlFor } from '@/lib/imageUrl';
import { Image } from "next-sanity/image";
import Fallback from "@/app/components/Fallback";
import { PROJECT_QUERY } from "@/constants/queries";
import { fetchQuery } from "@/lib/fetchQuery";
import TypeTag from "@/app/components/TypeTag";
import ProjectVideo from "@/app/components/ProjectVideo";

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
	const localizedTags = project.tags?.[locale] ?? project.tags?.[otherLocale];
	const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];
	const videoPoster = project.video_poster ? urlFor(project.video_poster).url() : "";

	return (
		<>
			<main className="min-h-screen mt-header">
				<section className="container mx-auto p-8 flex flex-col gap-4">
					<Link href={`/${locale}/projects`} className="hover:underline">
						{locale === "fr" ? "← Retour aux projets" : "← Back to projects"}
					</Link>

					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl lg:mb-5 font-hago leading-tight">
							{localizedTitle}
						</h1>

						<div className="flex flex-wrap items-center gap-2 sm:gap-3 lg:gap-6">
							{localizedTags.map((tag: string, index: number) => (
								<TypeTag key={index} text={tag} />
							))}
						</div>

						<div className="flex items-center gap-4 text-sm sm:text-base lg:block lg:text-right">
							<p>{project.client}</p>
							<p>{project.duration}</p>
						</div>
					</div>
				</section>
				
				{project.video_url && (
				<ProjectVideo url={project.video_url} poster={videoPoster} />
				)}
				<section className="container mx-auto p-8 flex flex-col gap-4">
					<div className="prose">
						<PortableText value={localizedBody} />
					</div>

					{galleryImages.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{galleryImages.map((image, index) => {
								const imageUrl = urlFor(image)?.url();
								if (!imageUrl) return null;

								return (
									<div className="relative h-64 w-full" key={image._key ?? index}>
										<Image
											src={imageUrl}
											alt={`${localizedTitle ?? "Project"} - image ${index + 1}`}
											fill
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											className="object-contain"
										/>
									</div>
								);
							})}
						</div>
					)}
				</section>
			</main>
		</>
	);
}
