import { Suspense } from "react";
import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { notFound } from "next/navigation";
import Link from "next/link";
import { client } from "@/sanity/client";
import Skeleton from "@/app/components/Skeleton";

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();

const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default function ProjectPage({ params }: PageProps) {
	return (
		<main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
			<Link href="/" className="hover:underline">← Back to posts </Link>

			<Suspense fallback={<Skeleton />}>
				<ProjectContent params={params} />
			</Suspense>
		</main>
	);
}

async function ProjectContent({ params }: PageProps) {
	const { slug } = await params;

	const project = await client.fetch<SanityDocument | null>(
		PROJECT_QUERY,
		{ slug },
		options
	);

	if (!project) {
		notFound();
	}

	const projectImageUrl = project.image
		? urlFor(project.image)?.width(550).height(310).url()
		: null;

	return (
		<>
			{projectImageUrl && (
				// eslint-disable-next-line @next/next/no-img-element
				<img
				src={projectImageUrl}
				alt={project.title ?? "Project image"}
				className="aspect-video rounded-xl"
				width={550}
				height={310}
				/>
			)}

			<h1 className="text-4xl font-bold mb-8">{project.title}</h1>

			<div className="prose">
				{Array.isArray(project.body) && (<PortableText value={project.body} /> )}
			</div>
		</>
	);
}