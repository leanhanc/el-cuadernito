/* MUI */
import { Stack, StackProps, styled } from '@mui/material';

/* Components */
import SignInCard from '@/views/sign-in/components/sign-in-card';
import SignInHeader from '@/views/sign-in/components/sign-in-header';

/* Styles */
const SignInContainer = styled(Stack)<StackProps>`
	height: 100dvh;
	width: 100dvw;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 5rem;
`;

export default function SignInView() {
	return (
		<SignInContainer as={'main'}>
			<SignInHeader />
			<SignInCard />
		</SignInContainer>
	);
}
