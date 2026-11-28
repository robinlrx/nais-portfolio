import { type SanityDocument } from "next-sanity";
import { notFound } from "next/navigation";
import NextImage from 'next/image'
import Fallback from "@/app/components/Fallback";
import { HOMEPAGE_QUERY } from "@/constants/queries";
import { fetchQuery } from "@/lib/fetchQuery";
import LocalizedBody from "@/app/components/LocalizedBody";
import ColorTag from "@/app/components/ColorTag";


type Props = {
	params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
	return (
		<Fallback>
			<HomeContent params={params} />
		</Fallback>
	);
}

async function HomeContent({ params }: Props) {

	const { locale } = await params;

	const homepage = await fetchQuery<SanityDocument | null>({
		query: HOMEPAGE_QUERY,
		params: { locale },
	});
	

	if (!homepage) {
		notFound();
	}

	const otherLocale = locale === "fr" ? "en" : "fr";
	const heroTitle = homepage.heroTitle?.[locale] ?? homepage.heroTitle?.[otherLocale];
	const introTags = homepage.intro_tags?.[locale] ?? homepage.intro_tags?.[otherLocale];
	const introText = homepage.intro_text?.[locale] ?? homepage.intro_text?.[otherLocale];

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
						<NextImage src={"/logo_nais-hoang_cartouche-blanc.png"} alt={"Logo Nais Hoang"} width={200} height={300} />
						<div className="border h-auto hidden md:block" />
						<div className="font-hago flex flex-col justify-between">
							{heroTitle.map((title: string, index: number) => (
								<h1 className="text-3xl" key={index}>{title}</h1>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* 2. Section en dessous : Avec le container et le padding */}
			<div className="container mx-auto p-8 flex flex-col justify-center items-center">
				<ColorTag color="yellow">
					<p>{introTags[0]}</p>
				</ColorTag>
				<ColorTag color="fushia">
					<p>{introTags[1]}</p>
				</ColorTag>
				<ColorTag color="blue">
					<NextImage src={"/logo_nais-hoang_blanc.svg"} alt={"Logo Nais Hoang"} width={150} height={200} />
				</ColorTag>

				<LocalizedBody value={introText} className="max-w-[600px] text-center text-xl"/>
			</div>
		</main>
	);
}
