import { createContext, useState, useEffect } from 'react';

/* Types */
import type { PropsWithChildren } from 'react';
import type { Language } from '../types';

/* Constants */
const STORAGE_KEY = 'ec-lang';

interface LanguageContextType {
	currentLang: Language | null;
	toggleLang: () => void;
	setLang: (newLang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType>({
	currentLang: null,
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	toggleLang: () => {},
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	setLang: () => {},
});

export function LanguageProvider({ children }: PropsWithChildren) {
	const [currentLang, setCurrentLang] = useState<Language>(() => {
		const storedValue = localStorage.getItem(STORAGE_KEY);

		if (storedValue) {
			if (storedValue === 'es' || storedValue === 'en') {
				return storedValue;
			}
		}

		if (navigator.languages?.length) {
			const isSpanish = navigator.languages.find((lang) => lang === 'es');
			if (isSpanish) {
				return 'es';
			}
		}

		return 'en';
	});

	const toggleLang = () => {
		setCurrentLang((current) => (current === 'en' ? 'es' : 'en'));
	};

	const setLang = (newLang: Language) => {
		setCurrentLang(newLang);
	};

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, currentLang);
	}, [currentLang]);

	if (!currentLang) {
		return null;
	}

	return (
		<LanguageContext.Provider value={{ currentLang, toggleLang, setLang }}>
			{children}
		</LanguageContext.Provider>
	);
}
