import { useState } from 'react';

/* MUI */
import Layout from '@/components/Layout';
import { Stack } from '@mui/material';

/* Components */
import AssetsHeader from './components/AssetsHeader';
import AddAssetModal from './components/AddAssetModal';

export default function AssetsView() {
	const [isAddingAsset, setIsAddingAsset] = useState(false);

	/* Handlers */
	function openAddAssetModal() {
		setIsAddingAsset(true);
	}

	function closeAddAssetModal() {
		setIsAddingAsset(false);
	}

	return (
		<Layout>
			<Stack direction="column">
				<AssetsHeader onAddAssetClick={openAddAssetModal} />
				<AddAssetModal
					handleClose={closeAddAssetModal}
					isOpen={isAddingAsset}
				/>
			</Stack>
		</Layout>
	);
}
