import { createFileRoute } from '@tanstack/react-router';

/* Components */
import Layout from '@/components/Layout.tsx';

export const Route = createFileRoute('/')({
	component: () => <Layout>Hello</Layout>,
});
