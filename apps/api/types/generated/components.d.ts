import type { Struct, Schema } from '@strapi/strapi';

export interface ListSyllabus extends Struct.ComponentSchema {
	collectionName: 'components_list_syllabi';
	info: {
		displayName: 'Syllabus';
		icon: 'bulletList';
		description: '';
	};
	attributes: {
		item: Schema.Attribute.String;
	};
}

declare module '@strapi/strapi' {
	export module Public {
		export interface ComponentSchemas {
			'list.syllabus': ListSyllabus;
		}
	}
}
