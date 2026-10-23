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

export const projectType = defineType({
	name: 'project',
	title: 'Project',
	type: 'document',
	preview: {
		select: {
			title: 'title.en',
		},
		prepare({title}) {
			return {
				title: title || 'Untitled project',
			}
		},
	},
	fields: [
		defineField({
			title: 'Titre',
			name: 'title',
			type: 'localizedString',
			validation: (rule) => rule.required(),
		}),
		defineField({
			name: 'slug',
			type: 'slug',
			options: {source: 'title.fr'},
			validation: (rule) => rule.required(),
		}),
		defineField({title: 'Sous titre', name: 'subtitle', type: 'localizedString'}),
		defineField({title: 'Paragraphe', name: 'paragraph', type: 'localizedString'}),
		defineField({title: 'Sous paragraphe', name: 'subparagraph', type: 'localizedString'}),
		defineField({title: 'URL vidéo', name: 'href', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
		defineField({title: 'Tags', name: 'tags', type: 'localizedTags'}),
		defineField({title: 'Durée vidéo', name: 'duration', type: 'localizedString'}),
		defineField({title: 'DA', name: 'artistic_direction', type: 'localizedString'}),
		defineField({name: 'storyboard', title: 'Storyboard', type: 'localizedString'}),
		defineField({name: 'client', title: 'Client', type: 'localizedString'}),
		defineField({title: 'Musique', name: 'music', type: 'localizedString'}),
		defineField({title: 'Description', name: 'body', type: 'localizedBody'}),
		defineField({
			name: 'gallery',
			title: "Galerie d'images",
			type: 'array',
			of: [defineArrayMember({type: 'image', options: {hotspot: true}})],
		}),
	],
})

export const projectSupportingTypes = [localizedString, localizedTags, localizedBody]
