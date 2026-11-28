import {defineArrayMember, defineField, defineType} from 'sanity'
import BlueDecorator from '../components/BlueDecorator'

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
		defineField({
		name: 'fr',
		title: 'Français',
		type: 'array',
		of: [
			{
			type: 'block',
			marks: {
				decorators: [
				{ title: 'Gras', value: 'strong' },
				{ title: 'Italique', value: 'em' },
				{ title: 'Underline', value: 'underline' },
				{
					title: 'Texte bleu',
					value: 'blue',
					icon: () => '🔵',
					component: BlueDecorator,
				},
				],
			},
			},
		],
		}),

		defineField({
		name: 'en',
		title: 'English',
		type: 'array',
		of: [
			{
			type: 'block',
			marks: {
				decorators: [
				{ title: 'Bold', value: 'strong' },
				{ title: 'Italic', value: 'em' },
				{ title: 'Underline', value: 'underline' },
				{
					title: 'Blue text',
					value: 'blue',
					icon: () => '🔵',
					component: BlueDecorator,
				},
				],
			},
			},
		],
		}),
	],
})

const localizedContent = defineType({
	name: 'localizedContent',
	title: 'Contenu traduit',
	type: 'object',
	fields: [
		defineField({
			name: 'heading',
			title: 'Titre',
			type: 'localizedString',
		}),
		defineField({
			name: 'body',
			title: 'Corps',
			type: 'localizedBody',
		}),
	],
})

export const projectSupportingTypes = [localizedString, localizedTags, localizedBody, localizedContent]