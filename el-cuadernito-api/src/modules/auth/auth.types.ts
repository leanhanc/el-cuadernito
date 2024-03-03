export interface GoogleOauthResponse {
	access_token: string;
	refresh_token: string;
	id_token: string;
}

export function isGoogleOauthResponse(
	obj: unknown,
): obj is GoogleOauthResponse {
	if (typeof obj !== 'object' || obj === null) {
		return false;
	}

	const response = obj as GoogleOauthResponse;

	return (
		typeof response.access_token === 'string' ||
		typeof response.refresh_token === 'string' ||
		typeof response.id_token === 'string'
	);
}

export interface DecodedUserProfile {
	email: string;
	name: string;
	given_name: string;
	family_name: string;
	picture: string;
}

export function isDecodedUserProfile(obj: unknown): obj is DecodedUserProfile {
	if (typeof obj !== 'object' || obj === null) {
		return false;
	}

	const profile = obj as DecodedUserProfile;

	return (
		typeof profile.email === 'string' &&
		typeof profile.name === 'string' &&
		typeof profile.given_name === 'string' &&
		typeof profile.family_name === 'string' &&
		typeof profile.picture === 'string'
	);
}
