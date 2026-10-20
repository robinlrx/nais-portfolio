import { client } from "@/sanity/client";
import {createImageUrlBuilder} from '@sanity/image-url'

const { projectId, dataset } = client.config();

// init builder with projectId and dataset
const builder = createImageUrlBuilder({
	projectId: projectId || '',
	dataset: dataset || '',
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlFor(source: any) {
	return builder.image(source)
}