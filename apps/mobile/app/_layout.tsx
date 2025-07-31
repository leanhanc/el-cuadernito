import { useState } from 'react';
import { Stack } from 'expo-router';

/* LiveStore */
import { makePersistedAdapter } from '@livestore/adapter-expo';
import { makeCfSync } from '@livestore/sync-cf';
import { LiveStoreProvider } from '@livestore/react';

/* Styles */
import '../lib/styles/unistyles';

/* Utils */
import { schema } from '@db';
import { Button, Text, View } from 'react-native';

const storeId = `el-cuadernito-${process.env.NODE_ENV}`;
const syncUrl = process.env.EXPO_PUBLIC_LIVESTORE_SYNC_URL;

const adapter = makePersistedAdapter({
	sync: { backend: syncUrl ? makeCfSync({ url: syncUrl }) : undefined },
});

const InternalApp = () => {
	return (
		<Stack>
			<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
		</Stack>
	);
};
export default function RootLayout() {
	const [, rerender] = useState({});

	return (
		<LiveStoreProvider
			adapter={adapter}
			schema={schema}
			storeId={storeId}
			batchUpdates={rerender}
			renderLoading={(_) => <Text>Loading LiveStore ({_.stage})...</Text>}
			renderError={(error: unknown) => <Text>Error: {error?.toString()}</Text>}
			renderShutdown={() => {
				return (
					<View>
						<Text>LiveStore Shutdown</Text>
						<Button
							title="Reload"
							onPress={() => {
								rerender({});
							}}
						/>
					</View>
				);
			}}
		>
			<InternalApp />
		</LiveStoreProvider>
	);
}
