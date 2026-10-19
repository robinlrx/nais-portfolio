import { Suspense } from 'react'
import { PortableText, type SanityDocument } from "next-sanity";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";
import { client } from "@/sanity/client";
import Link from "next/link";
import Skeleton from '@/app/components/Skeleton';

const PROJECT_QUERY = `*[_type == "project" && slug.current == $slug][0]`;

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
projectId && dataset
    ? createImageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default async function PostPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const project = await client.fetch<SanityDocument>(PROJECT_QUERY, await params, options);
	const projectImageUrl = project.image
		? urlFor(project.image)?.width(550).height(310).url()
		: null;

	return (
		<main className="container mx-auto min-h-screen max-w-3xl p-8 flex flex-col gap-4">
			<Link href="/" className="hover:underline">← Back to posts</Link>
			<Suspense fallback={<Skeleton />}>
				{projectImageUrl && (
					// eslint-disable-next-line @next/next/no-img-element
					<img
					src={projectImageUrl}
					alt={project.title}
					className="aspect-video rounded-xl"
					width="550"
					height="310"
					/>
				)}
				<h1 className="text-4xl font-bold mb-8">{project.title}</h1>
				<div className="prose">
					{Array.isArray(project.body) && <PortableText value={project.body} />}
				</div>
			</Suspense>
		</main>
	);
}