import { client } from "@/sanity/client";

const TRANSLATION_QUERY = `*[
  _type == "translation.metadata" &&
  references(*[
    _type == $type &&
    language == $locale &&
    slug.current == $slug
  ]._id)
][0] {
  "translations": translations[].value-> {
    language,
    "slug": slug.current,
    _type
  }
}`;

const options = { next: { revalidate: 30 } };

export async function getTranslatedSlug({
	slug,
	locale,
	type = "page",
}: {
	slug: string;
	locale: string;
	type?: string;
}): Promise<string | null> {
	const otherLocale = locale === "fr" ? "en" : "fr";

	const result = await client.fetch(
		TRANSLATION_QUERY,
		{ slug, locale, type },
		options
	);

	const translation = result?.translations?.find(
		(item: { language: string; slug: string; _type: string }) =>
		item.language === otherLocale && item._type === type
	);

	return translation?.slug ?? null;
}