import {defineArrayMember, defineField, defineType} from 'sanity'

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
		defineField({title: 'URL vidéo', name: 'href', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
		defineField({title: 'Tags', name: 'tags', type: 'localizedTags'}),
		defineField({title: 'Durée vidéo', name: 'duration', type: 'string'}),
		defineField({title: 'Année', name: 'year', type: 'string'}),
		defineField({title: 'Ecole', name: 'school', type: 'string'}),
		defineField({name: 'client', title: 'Client', type: 'array', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
		defineField({title: 'Partenaires', name: 'partners', type: 'string'}),
		defineField({title: 'Direction artistique', name: 'artistic_direction', type: 'string'}),
		defineField({name: 'storyboard', title: 'Storyboard', type: 'string'}),
		defineField({title: 'Animation', name: 'animation', type: 'string'}),
		defineField({title: 'Musique', name: 'music', type: 'string'}),
		defineField({title: 'Paragraphe', name: 'paragraph', type: 'localizedString'}),
		defineField({title: 'Sous paragraphe', name: 'subparagraph', type: 'localizedString'}),
		defineField({title: 'Description', name: 'body', type: 'localizedBody'}),
		defineField({
			name: 'gallery',
			title: "Galerie d'images",
			type: 'array',
			of: [
				defineArrayMember({type: 'image', options: {hotspot: true}}),
				defineArrayMember({type: 'file', options: {accept: 'video/mp4'}}),
			],
		}),
	],
})
