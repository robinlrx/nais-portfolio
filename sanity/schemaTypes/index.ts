import { type SchemaTypeDefinition } from 'sanity'
import { projectType, projectSupportingTypes } from "./projectType"

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [...projectSupportingTypes, projectType],
}
