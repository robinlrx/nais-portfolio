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
		defineField({title: 'URL vidéo', name: 'video_url', type: 'url', validation: (rule) => rule.uri({scheme: ['http', 'https']})}),
		defineField({title: 'Poster vidéo', name: 'video_poster', type: 'image', options: {hotspot: true} }),
		defineField({title: 'Tags', name: 'tags', type: 'localizedTags'}),
		defineField({title: 'Durée vidéo', name: 'duration', type: 'string'}),
		defineField({title: 'Année', name: 'year', type: 'string'}),

		
		defineField({title: 'Contenu 1', name: 'content1', type: 'localizedContent'}),
		defineField({
			name: 'gallery1',
			title: "Galerie d'images 1",
			type: 'array',
			of: [
				defineArrayMember({type: 'image', options: {hotspot: true}}),
				defineArrayMember({type: 'file', options: {accept: 'video/mp4'}}),
			],
		}),

		defineField({title: 'Contenu 2', name: 'content2', type: 'localizedContent'}),
		defineField({
			name: 'gallery2',
			title: "Galerie d'images 2",
			type: 'array',
			of: [
				defineArrayMember({type: 'image', options: {hotspot: true}}),
				defineArrayMember({type: 'file', options: {accept: 'video/mp4'}}),
			],
		}),

		defineField({title: 'Contenu 3', name: 'content3', type: 'localizedContent'}),
		defineField({
			name: 'gallery3',
			title: "Galerie d'images 3",
			type: 'array',
			of: [
				defineArrayMember({type: 'image', options: {hotspot: true}}),
				defineArrayMember({type: 'file', options: {accept: 'video/mp4'}}),
			],
		}),
		
		defineField({title: "Lien plus d'infos", name: 'infolink', type: 'string'}),
		
		
		defineField({title: 'Ecole', name: 'school', type: 'string'}),
		defineField({name: 'client', title: 'Client', type: 'array', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
		defineField({title: 'Partenaires', name: 'partners', type: 'array', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
		defineField({title: 'Direction artistique', name: 'artistic_direction', initialValue: ["Naïs Hoang"], type: 'array', of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
		defineField({name: 'storyboard', title: 'Storyboard', type: 'array', initialValue: ["Naïs Hoang"], of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
		defineField({title: 'Animation', name: 'animation', type: 'array', initialValue: ["Naïs Hoang"], of: [defineArrayMember({type: 'string'})], options: {layout: 'tags'}}),
		defineField({title: 'Musique', name: 'music', type: 'string'}),
		
		defineField({
			name: 'gallery',
			title: "Galerie d'images",
			type: 'array',
			of: [
				defineArrayMember({type: 'image', options: {hotspot: true}}),
				defineArrayMember({type: 'file', options: {accept: 'video/mp4'}}),
			],
		}),
		defineField({title: 'Description', name: 'body', type: 'localizedBody'}),
	],
})
