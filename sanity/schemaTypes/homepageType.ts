import {defineArrayMember, defineField, defineType} from 'sanity';

export const homePageType = {
	name: 'home',
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
		{
			name: 'heroTitle',
			title: 'Hero titre',
			type: 'localizedTags',
		},
		// Ajoutez ici les champs dont vous avez besoin (bannière, image, etc.)
	],
};