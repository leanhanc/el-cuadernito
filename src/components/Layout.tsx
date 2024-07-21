import type { ReactNode, PropsWithChildren } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';

/* Types */
import type { CommonTranslationKey } from '@/lib/types/translations';

/* MUI */
import {
	AppBar,
	Box,
	Button,
	Container,
	Drawer,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Toolbar,
} from '@mui/material';

/* Icons */
import BarChart from '@mui/icons-material/BarChart';
import Assets from '@mui/icons-material/MonetizationOn';
import Expenses from '@mui/icons-material/TrendingDown';

/* Images */
import Logo from '/images/logo.png';

/* Hooks */
import useTranslation from '@/lib/hooks/useTranslations';

type Props = PropsWithChildren;

interface DRAWER_ITEM {
	id: number;
	label: CommonTranslationKey;
	href: string;
	Icon: ReactNode;
}

const DRAWER_ITEMS: DRAWER_ITEM[] = [
	{
		id: 1,
		label: 'OVERVIEW',
		href: '/',
		Icon: <BarChart />,
	},
	{
		id: 2,
		label: 'ASSETS',
		href: '/assets',
		Icon: <Assets />,
	},
	{
		id: 3,
		label: 'EXPENSES',
		href: '/expenses',
		Icon: <Expenses />,
	},
] as const;

export default function Layout({ children }: Props) {
	/* Hooks */
	const navigate = useNavigate();
	const { t, toggleLang } = useTranslation();

	/* Handler */
	async function handleClick(route: string) {
		await navigate({ to: route });
	}

	return (
		<Box sx={{ display: 'flex', p: 0 }}>
			<AppBar
				color="primary"
				position="fixed"
				sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
			>
				<Toolbar disableGutters sx={{ px: 3 }}>
					<Link to="/">
						<img
							alt="Home"
							height={40}
							src={Logo}
							style={{ display: 'block' }}
							width="auto"
						/>
					</Link>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: 210,
					flexShrink: 0,
					[`& .MuiDrawer-paper`]: {
						width: 210,
						boxSizing: 'border-box',
					},
				}}
				variant="permanent"
			>
				<Toolbar />
				<Stack
					justifyContent="space-between"
					sx={{ overflow: 'auto', height: '100%' }}
				>
					<List>
						{DRAWER_ITEMS.map(({ label, href, Icon, id }) => (
							<ListItem key={id}>
								<ListItemButton
									onClick={() => {
										handleClick(href);
									}}
								>
									<ListItemIcon>{Icon}</ListItemIcon>
									<ListItemText primary={t('common', label)} />
								</ListItemButton>
							</ListItem>
						))}
					</List>

					<Stack alignItems="center" sx={{ p: 4 }}>
						<Button onClick={toggleLang}>Switch to spanish</Button>
					</Stack>
				</Stack>
			</Drawer>
			<Container component="main" sx={{ pt: 2 }}>
				<Toolbar />
				{children}
			</Container>
		</Box>
	);
}
