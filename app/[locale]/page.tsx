import { Suspense } from "react";
import { client } from "@/sanity/client";
import { PortableText, type SanityDocument } from "next-sanity";
import Skeleton from "@/app/components/Skeleton";
import { notFound } from "next/navigation";
import Image from "next/image";


type Props = {
	params: Promise<{ locale: string }>;
};

const HOME_QUERY = `*[
  _type == "homepage"
][0] {
  ...,
  "bgVideo": bgVideo.asset->url
}`;

const options = { next: { revalidate: 30 } };

export default function HomePage({ params }: Props) {
	return (
		<Suspense fallback={null}>
			<HomeContent params={params} />
		</Suspense>
	);
}

async function HomeContent({ params }: Props) {

	const { locale } = await params;

	const homepage = await client.fetch<SanityDocument | null>(
		HOME_QUERY,
		{ locale },
		options
	);
	console.log('homepage:', homepage)

	if (!homepage) {
		notFound();
	}

	const otherLocale = locale === "fr" ? "en" : "fr";
	const heroTitle = homepage.heroTitle?.[locale] ?? homepage.heroTitle?.[otherLocale];

	return (
		<main className="min-h-screen">
			{/* 1. Section Hero : Plein écran (Largeur & Hauteur) */}
			<section className="relative w-full h-screen text-white flex items-center justify-center p-4 overflow-hidden">
    
				<video className="absolute inset-0 z-0 h-full w-full object-cover object-center" autoPlay loop muted preload="none">
					<source src={homepage.bgVideo} type="video/mp4"></source>
				</video>

				{/* Contenu au premier plan */}
				<div className="relative p-8">
					{/* shadow */}
					<div className="absolute -inset-x-12 inset-y-0 bg-black/40 rounded-3xl blur-2xl z-0" />

					<div className="relative z-10 flex flex-col md:flex-row justify-center items-center md:items-stretch gap-8">
						<Image src={"/logo_nais-hoang_cartouche-blanc.png"} alt={"Logo Nais Hoang"} width={200} height={300} />
						<div className="border h-auto" />
						<div className="font-hago flex flex-col justify-between">
							{heroTitle.map((title: string, index: number) => (
								<h1 className="text-3xl" key={index}>{title}</h1>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* 2. Section en dessous : Avec le container et le padding */}
			<div className="container mx-auto p-8">
				<h2 className="text-2xl font-semibold mb-4">Section suivante</h2>
				<p>Le contenu de votre site est bien centré et confiné dans le container ici.</p>
			</div>
		</main>
	);
}
