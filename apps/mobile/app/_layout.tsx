import { useState } from 'react';
import { Stack } from 'expo-router';
import { Button, Text, View } from 'react-native';

/* LiveStore */
import { makePersistedAdapter } from '@livestore/adapter-expo';
import { makeCfSync } from '@livestore/sync-cf';
import { LiveStoreProvider } from '@livestore/react';
import { nanoid } from '@livestore/livestore';

/* DB */
import { schema, tables, events } from '@db';

/* Styles */
import '../lib/styles/unistyles';

const storeId = `el-cuadernito-${process.env.NODE_ENV}`;
const syncUrl = 'ws://10.0.2.2:8787';

const adapter = makePersistedAdapter({
	sync: { backend: makeCfSync({ url: syncUrl }) },
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
			syncPayload={{ authToken: 'insecure-token-change-me' }}
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
			boot={(store) => {
				if (store.query(tables.users.count()) === 0) {
					store.commit(
						events.createUser({
							id: nanoid(8),
							isPremium: true,
						}),
					);
				}
			}}
		>
			<InternalApp />
		</LiveStoreProvider>
	);
}
