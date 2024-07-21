import { useContext } from 'react';

/* Context */
import { LanguageContext } from '../context/translations';

/* Types */
import type { Namespace, Translations } from '../types';

/* Util */
import translations from '../locales';

export default function useTranslations() {
	const { currentLang, setLang, toggleLang } = useContext(LanguageContext);

	function t<N extends Namespace>(
		namespace: N,
		key: keyof Translations[N],
	): string {
		const translation = translations[currentLang!][namespace][key];
		if (!translation) {
			return key as string;
		}
		return translation as string;
	}

	return { lang: currentLang, setLang, toggleLang, t };
}
