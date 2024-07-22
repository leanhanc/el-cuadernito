import { Controller, useForm } from 'react-hook-form';

/* MUI */
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FormControl,
	FormControlLabel,
	FormLabel,
	InputLabel,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Stack,
	TextField,
	Typography,
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
import db from '@/lib/db/db';

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
			assetType: 'account',
			currency: 'ARS',
			description: '',
			holder: '',
		},
	});

	/* Handlers */
	const onSubmit: SubmitHandler<Schema> = async (data) => {
		// eslint-disable-next-line no-console
		console.log(data);
		await db.assets.add({
			amount: data.amount,
			asset_type: data.assetType,
			currency: data.currency,
			holder: data.holder,
			description: data.description,
			updated_at: Date.now().toLocaleString(),
		});
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
					<Stack>
						{/* Source (Select)  */}
						<Controller
							control={control}
							name="assetType"
							render={({ field }) => (
								<FormControl fullWidth>
									<InputLabel id="source">{t('common', 'SOURCE')}</InputLabel>
									<Select
										{...field}
										id="source"
										label={t('common', 'SOURCE')}
										labelId="source"
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

						<Stack
							alignItems="center"
							direction="row"
							justifyContent="space-between"
						>
							{/* Amount (Input)  */}
							<Controller
								control={control}
								name="amount"
								render={({ field }) => (
									<FormControl sx={{ mt: 4 }}>
										<InputLabel htmlFor="amount">
											{t('common', 'AMOUNT')}
										</InputLabel>
										<AmountInput
											error={!!errors.amount}
											fullWidth
											id="amount"
											label={t('common', 'AMOUNT')}
											onChange={field.onChange}
										/>
										{errors.amount && (
											<Typography color="error" sx={{ mt: 1 }}>
												{errors.amount.message}
											</Typography>
										)}
									</FormControl>
								)}
							/>

							{/* Currency (Radio Inputs)  */}
							<FormControl component="fieldset" sx={{ mt: 3.5 }}>
								<FormLabel
									component="legend"
									id="currency"
									sx={{ fontSize: '14px' }}
								>
									Currency
								</FormLabel>
								<Controller
									control={control}
									name="currency"
									render={({ field }) => (
										<RadioGroup
											{...field}
											aria-labelledby="currency"
											row
											sx={{ mt: 1 }}
										>
											<FormControlLabel
												control={<Radio />}
												label="USD"
												value="USD"
											/>
											<FormControlLabel
												control={<Radio />}
												label="ARS"
												value="ARS"
											/>
										</RadioGroup>
									)}
								/>
							</FormControl>
						</Stack>

						{/* Description (Input)  */}
						<Controller
							control={control}
							name="description"
							render={({ field }) => (
								<FormControl fullWidth sx={{ mt: 4 }}>
									<TextField
										error={!!errors.description}
										fullWidth
										id="description"
										label={t('common', 'DESCRIPTION')}
										{...field}
									/>
								</FormControl>
							)}
						/>

						{/* Holder (Input)  */}
						<Controller
							control={control}
							name="holder"
							render={({ field }) => (
								<FormControl fullWidth sx={{ mt: 4 }}>
									<TextField
										error={!!errors.holder}
										fullWidth
										id="holder"
										label={t('assets', 'HOLDER')}
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
