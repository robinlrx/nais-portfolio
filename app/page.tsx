import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/client";
import Navbar from "@/app/components/Navbar";

const PROJECTS_QUERY = `*[
  _type == "project"
  && defined(slug.current)
]{_id, title, slug}`;

const options = { next: { revalidate: 30 } };

export default async function Home() {
	const projects = await client.fetch<SanityDocument[]>(PROJECTS_QUERY, {}, options);

	return (
		<>
			<Navbar />
			<main className="container mx-auto min-h-screen p-8 border border-amber-600">
				<h1 className="text-4xl font-bold mb-8 font-hago">Posts</h1>
				<ul className="flex flex-col gap-y-4">
					{projects.map((project) => (
					<li className="hover:underline" key={project._id}>
						<Link href={`/projects/${project.slug.current}`}>
							<h2 className="text-xl font-bold">{project.title}</h2>
						</Link>
					</li>
					))}
				</ul>
			</main>
		</>
	);
}