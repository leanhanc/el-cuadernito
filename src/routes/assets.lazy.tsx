import { createLazyFileRoute } from '@tanstack/react-router';

/* View */
import AssetsView from '@/views/assets';

export const Route = createLazyFileRoute('/assets')({
	component: AssetsView,
});
