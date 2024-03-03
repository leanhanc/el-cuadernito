/* MUI */
import { Stack } from '@mui/material';

/* Images */
import Logo from '/logo.png';

export default function SignInHeader() {
	return (
		<Stack
			component="header"
			direction={'row'}
			gap={4}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<img src={Logo} alt="El Cuadernito" width={100} height="auto" />
		</Stack>
	);
}
