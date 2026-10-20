import {defineField, defineType, defineArrayMember} from 'sanity'

export const projectType = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	fields: [
		defineField({
			name: 'language',
			title: 'Langue',
			type: 'string',
			options: {
				list: [
					{title: 'Français', value: 'fr'},
					{title: 'English', value: 'en'},
				],
			},
		}),
		defineField({
			title: 'Titre',
			name: 'title',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {source: 'title'},
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: 'Sous titre',
			name: 'subtitle',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		// defineField({
		// 	name: 'publishedAt',
		// 	type: 'datetime',
		// 	initialValue: () => new Date().toISOString(),
		// 	validation: (rule) => rule.required(),
		// }),
		defineField({
			title: 'Paragraphe',
			name: 'paragraph',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: 'Sous paragraphe',
			name: 'subparagraph',
			type: 'string',
		}),
		defineField({
			title: 'URL vidéo',
			name: 'href',
			type: 'url',
			validation: (rule) => rule.uri({scheme: ['http', 'https']}),
		}),
		defineField({
			title: 'Tags',
			name: 'tags',
			type: 'array',
			of: [defineArrayMember({type: 'string'})],
			options: {
				layout: 'tags',
			},
		}),
		defineField({
			title: 'Durée vidéo',
			name: 'duration',
			type: 'string',
			validation: (rule) => rule.required(),
		}),
		defineField({
			title: 'DA',
			name: 'artistic_direction',
			type: 'string',
		}),
		defineField({
			name: 'storyboard',
			type: 'string',
		}),
		defineField({
			name: 'client',
			type: 'string',
		}),
		defineField({
			title: 'Musique',
			name: 'music',
			type: 'string',
		}),
		defineField({
			title: 'Description',
			name: 'body',
			type: 'array',
			of: [{type: 'block'}],
		}),
		defineField({
			name: 'gallery',
			title: "Galerie d'images",
			type: 'array',
			of: [
				defineArrayMember({
				type: 'image',
				options: {
					hotspot: true,
				},
				}),
			],
		}),
	],
})