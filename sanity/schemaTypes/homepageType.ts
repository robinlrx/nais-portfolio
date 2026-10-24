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
		// Ajoutez ici les champs dont vous avez besoin (bannière, image, etc.)
	],
};