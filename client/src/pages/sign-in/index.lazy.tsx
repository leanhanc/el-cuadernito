/* TanStack */
import { createLazyFileRoute } from '@tanstack/react-router';
export const Route = createLazyFileRoute('/sign-in/')({
	component: SignInPage,
});

/* View */
import SignInView from '@/views/sign-in';

function SignInPage() {
	return <SignInView />;
}
