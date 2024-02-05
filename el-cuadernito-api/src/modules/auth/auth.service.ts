import { HTTPException } from 'hono/http-exception';
import { eq } from 'drizzle-orm';

/* Schemas */
import { user } from '@lib/db/schema/user';

/* Types */
import { SignUpDto } from './auth.dto';

/* Utils */
import { encryptPassword } from '@lib/utils/password';

const authService = {
	signUp: async (dto: SignUpDto) => {
		const { db, email, password } = dto;

		const [emailAlreadyExists] = await db
			.select({ email: user.email, password: user.password })
			.from(user)
			.where(eq(user.email, email));

		console.log(emailAlreadyExists.password);

		const check = await verifyPassword(
			'lalala123',
			emailAlreadyExists.password,
		);

		console.log({ check });

		if (emailAlreadyExists) {
			throw new HTTPException(409, { message: 'Email already exists' });
		}

		const encryptedPassword = await encryptPassword(password);

		const newUserId = await db
			.insert(user)
			.values({ email, password: encryptedPassword })
			.returning({ id: user.id });

		return newUserId;
	},
};

export default authService;
