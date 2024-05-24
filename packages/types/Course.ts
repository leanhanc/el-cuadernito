import { StrapiImage } from './Strapi';

export type CourseCategory = 'Introductorio' | 'Tematico' | 'Laboratorio';

export interface Course {
	id: string;
	attributes: {
		name: string;
		slug: string;
		shortDescription: string;
		longDescription: string;
		category?: CourseCategory;
		isFree: boolean;
		cardImage?: StrapiImage;
		coverImage?: StrapiImage;
		syllabus?: {
			id: number;
			item: string;
		}[];
		arsPrice: number;
		usdPrice: number;
	};
}
