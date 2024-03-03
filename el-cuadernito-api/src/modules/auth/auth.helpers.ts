import { sign } from 'hono/jwt';

export async function emitToken(
	payload: Record<string, unknown>,
	tokenSecret: string,
) {
	return await sign(payload, tokenSecret);
}
