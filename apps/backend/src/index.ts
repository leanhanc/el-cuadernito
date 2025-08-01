/* Dependencies */
import { makeDurableObject, makeWorker } from '@livestore/sync-cf/cf-worker';

/* Types */
import type { PushMessage, PullMessage, AuthPayload } from './types';

export class WebSocketServer extends makeDurableObject({
	onPush: (message: PushMessage) => {
		console.log('onPush', message.batch, 'requestId:', message.requestId);
		return Promise.resolve();
	},
	onPull: (message: PullMessage) => {
		console.log(
			'onPull',
			message,
			'requestId:',
			message.requestId,
			'cursor:',
			message.cursor,
		);
		return Promise.resolve();
	},
}) {}

export default makeWorker({
	validatePayload: (payload: unknown) => {
		console.log('Validating connection payload:', payload);
		const authPayload = payload as AuthPayload;
		if (authPayload.authToken !== 'insecure-token-change-me') {
			throw new Error('Invalid auth token');
		}
	},
	enableCORS: true,
});
