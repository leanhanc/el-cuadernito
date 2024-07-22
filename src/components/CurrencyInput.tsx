import React, { useState } from 'react';

/* MUI */
import { InputAdornment, OutlinedInput } from '@mui/material';

/* Hooks */
import useTranslations from '@/lib/hooks/useTranslations';

/* Types */
import type { OutlinedInputProps } from '@mui/material';

interface AmountInputProps extends Omit<OutlinedInputProps, 'onChange'> {
	onChange: (value: number) => void;
}

export default function AmountInput({ onChange, ...props }: AmountInputProps) {
	const { lang } = useTranslations();
	const [displayValue, setDisplayValue] = useState('');

	const getDecimalSeparator = () => {
		if (!lang) return '.';

		return Intl.NumberFormat(lang)
			.format(1.1)
			.replace(/\p{Number}/gu, '');
	};

	const formatNumber = (value: number) => {
		if (!lang) return value.toString();

		return new Intl.NumberFormat(lang, {
			minimumFractionDigits: 0,
			maximumFractionDigits: 2,
		}).format(value);
	};

	const parseLocaleNumber = (stringNumber: string): number => {
		if (!lang) return 0;

		const thousandSeparator = Intl.NumberFormat(lang)
			.format(11111)
			.replace(/\p{Number}/gu, '');
		const decimalSeparator = getDecimalSeparator();

		return (
			parseFloat(
				stringNumber
					.replace(new RegExp('\\' + thousandSeparator, 'g'), '')
					.replace(new RegExp('\\' + decimalSeparator), '.'),
			) || 0
		);
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value;
		const decimalSeparator = getDecimalSeparator();

		// Allow only one decimal separator
		const parts = inputValue.split(decimalSeparator);
		if (parts.length > 2) {
			return; // More than one decimal separator, don't update
		}

		// Remove any non-numeric characters except the decimal separator
		const cleanedValue = inputValue.replace(
			new RegExp(`[^\\d${decimalSeparator}]`, 'g'),
			'',
		);

		if (cleanedValue === '' || cleanedValue === decimalSeparator) {
			setDisplayValue(cleanedValue);
			onChange(0);
			return;
		}

		const numericValue = parseLocaleNumber(cleanedValue);

		// Format the integer part, but keep the decimal part as is
		const [integerPart, decimalPart] = cleanedValue.split(decimalSeparator);
		let formattedValue = formatNumber(parseFloat(integerPart) || 0);
		if (decimalPart !== undefined) {
			formattedValue += decimalSeparator + decimalPart;
		}
		setDisplayValue(formattedValue);
		onChange(numericValue);
	};

	const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
		const numericValue = parseLocaleNumber(event.target.value);
		const formattedValue = formatNumber(numericValue);
		setDisplayValue(formattedValue);
		onChange(numericValue);
	};

	return (
		<OutlinedInput
			startAdornment={<InputAdornment position="start">$</InputAdornment>}
			value={displayValue}
			onBlur={handleBlur}
			onChange={handleChange}
			{...props}
		/>
	);
}
