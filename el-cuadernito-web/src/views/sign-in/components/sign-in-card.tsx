import { useGoogleLogin } from '@react-oauth/google';

/* MUI */
import {
	Button,
	Card,
	CardContent,
	CardProps,
	Typography,
	styled,
} from '@mui/material';

/* Styles */
const SignInCardContainer = styled(Card)<CardProps>`
	padding: 2rem;
	width: 31rem;
`;

export default function SignInCard() {
	const signIn = useGoogleLogin({
		flow: 'auth-code',
		onSuccess: async (codeResponse) => {
			try {
				await fetch(
					`${import.meta.env.VITE_API_BASE_URL}/auth/sign-in/google`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ code: codeResponse.code }),
					},
				);
			} catch (error) {
				// eslint-disable-next-line no-console
				console.error('[SignInCard] Sign-in error: ', error);
			}
		},
		onError(errorResponse) {
			// eslint-disable-next-line no-console
			console.error(errorResponse);
		},
	});

	return (
		<SignInCardContainer>
			<CardContent>
				<Typography variant="h4" component={'h1'} color="text.secondary">
					Sign-In
				</Typography>
			</CardContent>

			<Button
				variant="contained"
				color="primary"
				onClick={() => signIn()}
				fullWidth
			>
				Sign in with Google
			</Button>
		</SignInCardContainer>
	);
}
