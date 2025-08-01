/* Types */
import type { DbSchema } from '@db';

/* WebSocket Message Types */
export interface PushMessage {
	readonly _tag: 'WSMessage.PushReq';
	readonly requestId: string;
	readonly batch: readonly {
		readonly name: string;
		readonly args: unknown;
		readonly seqNum: number;
		readonly parentSeqNum: number;
		readonly clientId: string;
		readonly sessionId: string;
	}[];
}

export interface PullMessage {
	readonly _tag: 'WSMessage.PullReq';
	readonly requestId: string;
	readonly cursor?: number;
}

/* Auth Payload Type - compatible with JsonValue */
export interface AuthPayload {
	authToken?: string;
	userId?: string;
	[key: string]: unknown;
}

/* Database Schema Types */
export type DatabaseSchema = DbSchema;
