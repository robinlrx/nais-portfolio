import { type SchemaTypeDefinition } from 'sanity'
import { projectType } from "./projectType"
import { homePageType } from "./homepageType"
import {projectSupportingTypes} from "@/sanity/lib/localizedType"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...projectSupportingTypes, projectType, homePageType],
}
