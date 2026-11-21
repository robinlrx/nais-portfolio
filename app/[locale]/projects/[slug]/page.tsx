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
	const creditLabels: Record<string, Record<string, string>> = {
		client: { fr: "Client", en: "Client" },
		partners: { fr: "Partenaires", en: "Partners" },
		artistic_direction: { fr: "Direction artistique", en: "Art direction" },
		storyboard: { fr: "Storyboard", en: "Storyboard" },
		animation: { fr: "Animation", en: "Animation" },
		music: { fr: "Musique", en: "Music" },
	};

	const credits = [
		{ label: creditLabels.client[locale] ?? creditLabels.client[otherLocale], value: project?.client },
		{ label: creditLabels.partners[locale] ?? creditLabels.partners[otherLocale], value: project?.partners },
		{
			label: creditLabels.artistic_direction[locale] ?? creditLabels.artistic_direction[otherLocale],
			value: project?.artistic_direction,
		},
		{ label: creditLabels.storyboard[locale] ?? creditLabels.storyboard[otherLocale], value: project?.storyboard },
		{ label: creditLabels.animation[locale] ?? creditLabels.animation[otherLocale], value: project?.animation },
		{ label: creditLabels.music[locale] ?? creditLabels.music[otherLocale], value: project?.music },
	].filter((item) => Boolean(item.value && String(item.value).trim() !== ""));

	return (
		<>
			<main className="min-h-screen mt-header">
				<section className="container mx-auto p-8 flex flex-col gap-4">
					<Link href={`/${locale}/projects`} className="hover:underline">
						{locale === "fr" ? "← Retour aux projets" : "← Back to projects"}
					</Link>

					<div className="flex flex-wrap items-center gap-2 sm:gap-3">
						{localizedTags.map((tag: string, index: number) => (
							<TypeTag key={index} text={tag} />
						))}
					</div>

					<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
						<h1 className="text-4xl md:text-5xl lg:text-6xl lg:mb-5 font-hago leading-tight">
							{project.client} | {localizedTitle}
						</h1>
						<div className="hidden lg:block flex-1 min-w-4 h-1 bg-black" />
						<div className="flex items-center text-sm sm:text-base lg:block lg:text-right">
							<div className="flex items-center gap-2">
								<svg id="Calque_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.59 8.48" className="h-4">
									<g id="Isolation_Mode">
										<path d="M0,4.24c0-1.04,0-2.08,0-3.12,0-.16,0-.32.04-.47C.18.1.62-.13,1.15.07c.12.05.23.1.34.17,1.81,1.04,3.62,2.09,5.44,3.14.1.06.21.13.3.2.48.38.48.94,0,1.32-.11.09-.23.16-.36.24-1.77,1.02-3.54,2.05-5.32,3.07-.19.11-.41.2-.62.25-.38.09-.72-.11-.83-.48-.06-.19-.09-.4-.09-.6C0,6.33,0,5.29,0,4.24Z"/>
									</g>
								</svg>
								<p>{project.duration}</p>
							</div>
						</div>
					</div>
				</section>
				
				{project.video_url && (
				<ProjectVideo url={project.video_url} poster={videoPoster} />
				)}
				<section className="container mx-auto p-8 flex flex-col gap-4">
					<div className="m-auto flex w-[817px] max-w-full flex-col divide-y-2 divide-black overflow-hidden rounded-3xl border-2 border-black bg-transparent md:min-h-[88px] md:w-[980px] md:flex-row md:items-stretch md:divide-x-2 md:divide-y-0 md:rounded-full lg:min-h-[96px] lg:w-[1120px]">
						{credits.map((item) => (
							<div
							key={item.label}
							className="flex flex-1 flex-col items-center justify-center px-4 py-3.5 text-center leading-tight md:px-5 md:py-3"
							>
							<p className="font-bold text-black lg:text-lg">{item.label}</p>
							{Array.isArray(item.value) ? (
								<div className="flex flex-col text-sm text-black lg:text-base">
									{item.value.map((val, i) => (
										<p key={i}>{val}</p>
									))}
								</div>
							) : (
								<p className="text-sm text-black lg:text-base">{item.value}</p>
							)}
							</div>
						))}
					</div>

					<div className="prose">
						<PortableText value={localizedBody} />
					</div>

					{galleryImages.length > 0 && (
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
							{galleryImages.map((image, index) => {
								const imageUrl = urlFor(image)?.url();
								const dimensions = image.asset?.metadata?.dimensions;
								if (!imageUrl || !dimensions) return null;

								return (
									<div className="relative w-full" key={image._key ?? index}>
										<Image
											src={imageUrl}
											alt={`${localizedTitle ?? "Project"} - image ${index + 1}`}
											width={dimensions.width}
											height={dimensions.height}
											sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
											className="w-full h-auto object-contain"
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
