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
	width: 420px;
`;

const Title = styled(Typography)`
	font-weight: 500;
	text-wrap: pretty;
	margin-bottom: 2rem;
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
				<Title variant="body2">
					Sign in with your Google Account to open your Cuadernito.
				</Title>
				<Button
					variant="contained"
					color="primary"
					onClick={() => signIn()}
					fullWidth
				>
					Sign in with Google
				</Button>
			</CardContent>
		</SignInCardContainer>
	);
}
