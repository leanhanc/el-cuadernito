/* MUI */
import { Stack, Typography, styled } from '@mui/material';

/* Images */
import Logo from '/logo.png';

const Title = styled(Typography)``;

export default function SignInHeader() {
	return (
		<Stack
			component="header"
			gap={4}
			alignItems={'center'}
			justifyContent={'center'}
		>
			<img src={Logo} alt="El Cuadernito" width={100} height="auto" />
			<Title variant="h2" textAlign="center">
				El Cuadernito
			</Title>
		</Stack>
	);
}
