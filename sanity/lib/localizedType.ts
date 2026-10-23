import {defineArrayMember, defineField, defineType} from 'sanity'

const localizedString = defineType({
	name: 'localizedString',
	title: 'Texte traduit',
	type: 'object',
	fields: [
		defineField({name: 'fr', title: 'Français', type: 'string'}),
		defineField({name: 'en', title: 'English', type: 'string'}),
	],
})

const localizedTags = defineType({
	name: 'localizedTags',
	title: 'Tags traduits',
	type: 'object',
	fields: [
		defineField({
			name: 'fr',
			title: 'Français',
			type: 'array',
			of: [defineArrayMember({type: 'string'})],
			options: {layout: 'tags'},
		}),
		defineField({
			name: 'en',
			title: 'English',
			type: 'array',
			of: [defineArrayMember({type: 'string'})],
			options: {layout: 'tags'},
		}),
	],
})

const localizedBody = defineType({
	name: 'localizedBody',
	title: 'Description traduite',
	type: 'object',
	fields: [
		defineField({name: 'fr', title: 'Français', type: 'array', of: [{type: 'block'}]}),
		defineField({name: 'en', title: 'English', type: 'array', of: [{type: 'block'}]}),
	],
})

export const projectSupportingTypes = [localizedString, localizedTags, localizedBody]