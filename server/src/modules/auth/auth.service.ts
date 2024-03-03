import { decode } from 'hono/jwt';

/* Types */
import {
	DecodedUserProfile,
	isDecodedUserProfile,
	isGoogleOauthResponse,
} from './auth.types';
import { SignInDto } from './auth.dto';

/* Models */
import user from '../user';

/* Helpers */
import { emitToken } from './auth.helpers';

const authService = {
	signIn: async ({
		db,
		code,
		googleClientId,
		googleClientSecret,
		tokenSecret,
	}: SignInDto) => {
		const response = await fetch('https://oauth2.googleapis.com/token', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				code,
				client_id: googleClientId,
				client_secret: googleClientSecret,
				redirect_uri: 'postmessage',
				grant_type: 'authorization_code',
				scopes: 'email profile',
			}),
		});

		const result = await response.json();

		if (!isGoogleOauthResponse(result)) {
			throw Error('Error getting user info from Google');
		}

		const { id_token: idToken } = result;
		const decodedToken: { header: string; payload: DecodedUserProfile } =
			decode(idToken);

		if (!isDecodedUserProfile(decodedToken.payload)) {
			if (!isGoogleOauthResponse(result)) {
				throw Error('Error getting user info from Google');
			}
		}

		// If user exists, log in. Otherwise, create user and log in.
		const existingUser = await user.service.findOneByEmail(
			db,
			decodedToken.payload.email,
		);
		if (!existingUser) {
			const result = await user.service.createUser(db, {
				email: decodedToken.payload.email,
			});

			if (!result?.length) {
				throw Error('Error creating user.');
			}
			const userId = result[0].id;
			const token = await emitToken({ id: userId }, tokenSecret);

			return token;
		} else {
			return await emitToken({ id: existingUser.id }, tokenSecret);
		}
	},
};

export default authService;
