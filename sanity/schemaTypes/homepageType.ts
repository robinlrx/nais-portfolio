import {defineArrayMember, defineField, defineType} from 'sanity';

export const homePageType = {
	name: 'homepage',
	title: 'Page d\'accueil',
	type: 'document',
	preview: {
		prepare() {
			return {
				title: 'Homepage',
			}
		},
	},
	fields: [
		defineField({title: 'Hero titre', name: 'heroTitle', type: 'localizedTags'}),
		defineField({title: 'Vidéo de fond', name: 'bgVideo', type: 'file'}),

		defineField({title: 'Intro tags', name: 'intro_tags', type: 'localizedTags'}),
		defineField({title: 'Intro texte', name: 'intro_text', type: 'localizedBody'}),

		defineField({title: 'Projets', name: 'projects',
         type: 'array',
         of: [defineArrayMember({ type: 'reference', to: [{type: 'project'}] })]
		}),
	],
};
