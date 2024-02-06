/* TanStack */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: HomePage,
});

function HomePage() {
	return <h3>Welcome Home!</h3>;
}
