/* MUI */
import { Stack, StackProps, styled } from '@mui/material';

/* Components */
import SignInCard from '@/views/sign-in/components/sign-in-card';
import SignInHeader from '@/views/sign-in/components/sign-in-header';

/* Styles */
const SignInContainer = styled('div')<StackProps>`
	height: 100dvh;
	width: 100dvw;
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 5rem;
`;

const ContentContainer = styled(Stack)`
	width: 50%;
	align-items: center;
	justify-content: center;
	gap: 4rem;
`;

const BackgroundImageContainer = styled(Stack)`
	width: 50%;
	height: 100%;
	position: relative;
	background-image: radial-gradient(
		ellipse at center,
		rgba(0, 0, 0, 0) 0%,
		rgba(0, 0, 0, 0) 50%,
		rgba(0, 0, 0, 1) 90%
	);
`;

const BackgroundImage = styled('img')`
	position: absolute;
	inset: 0;
	width: 100%;
	height: 100%;
	opacity: 0.8;
`;

export default function SignInView() {
	return (
		<SignInContainer as={'main'}>
			<ContentContainer>
				<SignInHeader />
				<SignInCard />
			</ContentContainer>
			<BackgroundImageContainer>
				<BackgroundImage src={'/images/invoicing.jpg'} alt="" />
			</BackgroundImageContainer>
		</SignInContainer>
	);
}
