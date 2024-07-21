/* MUI */
import { Button, Stack, Typography } from '@mui/material';

/* Icons */
import { Add } from '@mui/icons-material';

/* Hooks */
import useTranslations from '@/lib/hooks/useTranslations';

interface Props {
	onAddAssetClick: () => void;
}

export default function AssetsHeader({ onAddAssetClick }: Props) {
	const { t } = useTranslations();

	return (
		<Stack
			alignItems="center"
			component="header"
			direction="row"
			height={'80px'}
		>
			<Typography variant="h4">{t('assets', 'HEADING')}</Typography>
			<Button
				endIcon={<Add />}
				sx={{ borderRadius: 2, ml: 'auto' }}
				variant="contained"
				onClick={onAddAssetClick}
			>
				<Typography fontWeight="medium">{t('assets', 'ADD_ASSET')}</Typography>
			</Button>
		</Stack>
	);
}
