/**
 * Exécute une requête Sanity de manière générique.
 * 
 * @template T - Le type TypeScript attendu pour le résultat de la requête 
 * (ex: SanityDocument | null, un tableau d'objets, etc.).
 * @param query - La requête GROQ sous forme de chaîne de caractères.
 * @param params - Les variables optionnelles injectées dans la requête.
 * @param options - Les options de configuration de la requête Sanity.
 * @returns Une promesse résolue avec les données typées en T.
**/

import { client } from "@/sanity/client";
import type { FilteredResponseQueryOptions } from "next-sanity";

type FetchQueryArgs = {
	query: string;
	params?: Record<string, unknown>;
	options?: FilteredResponseQueryOptions;
};

export async function fetchQuery<T>({ query, params = {}, options = {next: {revalidate: 30}} }: FetchQueryArgs): Promise<T> {
	return client.fetch<T>(query, params, options);
}