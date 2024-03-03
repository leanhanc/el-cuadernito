/* TanStack */
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
	component: HomePage,
});

function HomePage() {
	return <main>HOME PAGE</main>;
}
