export type Language = 'es' | 'en';

export interface Translations {
	common: {
		OVERVIEW: string;
		ASSETS: string;
		EXPENSES: string;
		ADD: string;
		CANCEL: string;
		SOURCE: string;
		CASH: string;
		ACCOUNT: string;
		INVESTMENT: string;
		OTHER: string;
		AMOUNT: string;
	};
	assets: {
		HEADING: string;
		ADD_ASSET: string;
		FORM_HEADING: string;
	};
}

export type Namespace = keyof Translations;

export type CommonTranslationKey = keyof Translations['common'];
export type AssetsTranslationKEy = keyof Translations['assets'];

export type TranslationKey = {
	[N in Namespace]: keyof Translations[N];
}[Namespace];
