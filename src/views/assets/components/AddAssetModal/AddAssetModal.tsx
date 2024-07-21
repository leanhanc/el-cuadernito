import { Controller, useForm } from 'react-hook-form';

/* MUI */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Stack,
} from '@mui/material';

/* Types */
import type { SubmitHandler } from 'react-hook-form';
import type { infer as Infer } from 'zod';

/* Validations */
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

/* Hooks */
import useTranslations from '@/lib/hooks/useTranslations';

/* Components */
import AmountInput from '@/components/CurrencyInput';

interface Props {
	isOpen: boolean;
	handleClose: () => void;
}

const schema = z.object({
	amount: z.number(),
	assetType: z.enum(['account', 'cash', 'investment', 'other']),
	currency: z.enum(['USD', 'ARS']),
	holder: z.string().optional(),
	description: z.string().optional(),
});

type Schema = Infer<typeof schema>;

export default function AddAssetModal({ isOpen, handleClose }: Props) {
	const { t } = useTranslations();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<Schema>({
		resolver: zodResolver(schema),
		defaultValues: {
			amount: 0,
			assetType: 'account',
			currency: 'ARS',
		},
	});

	/* Handlers */
	const onSubmit: SubmitHandler<Schema> = (data) => {
		// eslint-disable-next-line no-console
		console.log(data);
	};

	return (
		<Dialog
			aria-describedby="alert-dialog-description"
			aria-labelledby="alert-dialog-title"
			disablePortal
			open={isOpen}
		>
			<DialogTitle id="alert-dialog-title">
				{t('assets', 'FORM_HEADING')}
			</DialogTitle>

			<form onSubmit={handleSubmit(onSubmit)}>
				<DialogContent>
					<Stack mt={4}>
						{/* Source (Select)  */}
						<Controller
							control={control}
							name="assetType"
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel id="source">Source</InputLabel>
									<Select
										id="source"
										labelId="demo-simple-select-label"
										{...field}
									>
										<MenuItem value="cash">{t('common', 'CASH')}</MenuItem>
										<MenuItem value="account">
											{t('common', 'ACCOUNT')}
										</MenuItem>
										<MenuItem value="investment">
											{t('common', 'INVESTMENT')}
										</MenuItem>
										<MenuItem value="other">{t('common', 'OTHER')}</MenuItem>
									</Select>
								</FormControl>
							)}
						/>

						{/* Amount (Input)  */}
						<Controller
							control={control}
							name="amount"
							render={({ field }) => (
								<FormControl fullWidth sx={{ mt: 4 }}>
									<InputLabel id="amount">{t('common', 'AMOUNT')}</InputLabel>
									<AmountInput
										error={!!errors.amount}
										fullWidth
										helperText={errors.amount?.message}
										{...field}
									/>
								</FormControl>
							)}
						/>
					</Stack>
				</DialogContent>

				<DialogActions>
					<Button type="submit" onClick={handleClose}>
						{t('common', 'CANCEL')}
					</Button>
					<Button color="primary" type="submit" variant="contained">
						{t('common', 'ADD')}
					</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
}
