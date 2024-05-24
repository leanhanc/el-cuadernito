export interface StrapiImage {
	data: {
		id: string;
		attributes: {
			url: string;
			width: number;
			height: number;
			alternativeText?: string;
			formats: {
				thumbnail?: {
					url: string;
					width: number;
					height: number;
				};
				small?: {
					url: string;
					width: number;
					height: number;
				};
				medium?: {
					url: string;
					width: number;
					height: number;
				};
				large?: {
					url: string;
					width: number;
					height: number;
				};
			};
		};
	};
}
