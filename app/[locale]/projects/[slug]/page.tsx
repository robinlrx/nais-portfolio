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
import ProjectGallery from "@/app/components/ProjectGallery";

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
	const localizedSubtitle = project.subtitle?.[locale] ?? project.subtitle?.[otherLocale];
	const localizedTags = project.tags?.[locale] ?? project.tags?.[otherLocale];
	const videoPoster = project.video_poster ? urlFor(project.video_poster).url() : "";
	const localizedContent1 = {
		heading: project?.content1?.heading?.[locale] ?? project?.content1?.heading?.[otherLocale],
		body: project?.content1?.body?.[locale] ?? project?.content1?.body?.[otherLocale]
	}
	const gallery1 = Array.isArray(project.gallery1) ? project.gallery1 : [];

	const localizedContent2 = {
		heading: project?.content2?.heading?.[locale] ?? project?.content2?.heading?.[otherLocale],
		body: project?.content2?.body?.[locale] ?? project?.content2?.body?.[otherLocale]
	}
	const gallery2 = Array.isArray(project.gallery2) ? project.gallery2 : [];

	const localizedContent3 = {
		heading: project?.content3?.heading?.[locale] ?? project?.content3?.heading?.[otherLocale],
		body: project?.content3?.body?.[locale] ?? project?.content3?.body?.[otherLocale]
	}
	const gallery3 = Array.isArray(project.gallery3) ? project.gallery3 : [];

	const galleryImages = Array.isArray(project.gallery) ? project.gallery : [];

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
						{locale === "fr" ? "← Tous les projets" : "← All projects"}
					</Link>

					<div className="flex flex-col gap-4">
						{/* left block */}
						<div className="flex flex-col">
							<p className="text-gray-500 uppercase font-bold">{project.client} &middot; {project.year}</p>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-hago leading-tight">
								{localizedTitle}
							</h1>
						</div>
						
						{/* right block*/}
						<div className="flex flex-col lg:flex-row text-sm sm:text-base justify-between gap-4 lg:gap-2">
							<h2 className="text-2xl lg:w-[60%]">{localizedSubtitle}</h2>

							<div className="flex flex-col gap-2">
								<div className="flex flex-wrap items-center lg:justify-end gap-2 sm:gap-3">
									{localizedTags.map((tag: string, index: number) => (
										<TypeTag key={index} text={tag} />
									))}
								</div>
								<div className="flex items-center gap-2 lg:self-end">
									<svg id="Calque_2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 7.59 8.48" className="h-4">
										<g id="Isolation_Mode">
											<path d="M0,4.24c0-1.04,0-2.08,0-3.12,0-.16,0-.32.04-.47C.18.1.62-.13,1.15.07c.12.05.23.1.34.17,1.81,1.04,3.62,2.09,5.44,3.14.1.06.21.13.3.2.48.38.48.94,0,1.32-.11.09-.23.16-.36.24-1.77,1.02-3.54,2.05-5.32,3.07-.19.11-.41.2-.62.25-.38.09-.72-.11-.83-.48-.06-.19-.09-.4-.09-.6C0,6.33,0,5.29,0,4.24Z"/>
										</g>
									</svg>
									<p>{project.duration}</p>
								</div>
							</div>
						</div>

					</div>
				</section>

				{project.video_url && (
					<ProjectVideo url={project.video_url} poster={videoPoster} />
				)}
				
				{/* main content */}
				<section className="container mx-auto p-8 flex flex-col gap-4">
					{/* content 1 */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">

						<div className="lg:p-6 lg:pl-0">
							<h2 className="text-4xl font-hago">{localizedContent1.heading}</h2>
						</div>


						<div className="prose text-black lg:p-6 lg:pl-0">
							<PortableText value={localizedContent1.body} />
						</div>
					</div>

					<div className="grid grid-cols-2 gap-3 md:grid-cols-2 lg:grid-cols-3 [&>*:nth-child(3n+1)]:col-span-2 md:[&>*:nth-child(3n+1)]:col-span-1">
						<ProjectGallery galleryImages={gallery1} />
					</div>

					{/* content 2 */}
					{localizedContent2 &&
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">

							<div className="lg:p-6 lg:pl-0">
								<h2 className="text-4xl font-hago">{localizedContent2.heading}</h2>
							</div>


							<div className="prose text-black lg:p-6 lg:pl-0">
								<PortableText value={localizedContent2.body} />
							</div>
						</div>
					}

					<div className="grid grid-cols-1 gap-4 md:grid-cols-[1fr_calc((100%_-_2.7778rem)/3)] md:[&>*:nth-child(3n+1)]:row-span-2 md:[&>*:nth-child(3n+1)]:h-full">
					<ProjectGallery galleryImages={gallery2} imageClassName="w-full h-auto object-cover" />
					</div>

					{/* content 3 */}
					{localizedContent3 &&
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-black">

							<div className="lg:p-6 lg:pl-0">
								<h2 className="text-4xl font-hago">{localizedContent3.heading}</h2>
							</div>


							<div className="prose text-black lg:p-6 lg:pl-0">
								<PortableText value={localizedContent3.body} />
							</div>
						</div>
					}

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<ProjectGallery galleryImages={gallery3} />
					</div>

					{/* old */}
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
						<ProjectGallery galleryImages={galleryImages} />
					</div>
				</section>

				{/* credits */}
				<section className="container mx-auto p-8 flex flex-col gap-4">
					<div className="border-t-2 border-black pt-6 pb-12">
						<div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr] lg:gap-8">
							<h2 className="text-3xl font-hago tracking-tight text-black">
								{locale === "fr" ? "Crédits" : "Credits"}
							</h2>

							<dl className="flex flex-col divide-y divide-neutral-200 lg:grid lg:grid-cols-[repeat(3,auto)] lg:justify-between lg:gap-4 lg:divide-y-0">
								{credits.map(({ label, value }) => (
									<div key={label} className="flex items-center justify-between gap-4 py-3 lg:block lg:py-0">
										<dt className="text-base text-neutral-500 lg:text-xs lg:font-bold lg:uppercase lg:tracking-widest lg:text-neutral-600">{label}</dt>
										<dd className="text-right text-base font-semibold text-black lg:mt-1 lg:text-left lg:text-lg">{Array.isArray(value) ? value.join(', ') : value}</dd>
									</div>
								))}
							</dl>
						</div>
					</div>
				</section>
			</main>
		</>
	);
}
