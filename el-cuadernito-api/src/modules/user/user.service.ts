import { eq } from 'drizzle-orm';

/* Types */
import type { Database } from '@lib/types/db';
import type { InferInsertModel } from 'drizzle-orm';

/* Model */
import { user } from '@lib/db/schema/user';

const userService = {
	createUser: async function createUser(
		db: Database,
		userDto: InferInsertModel<typeof user>,
	) {
		const mutationResult = await db
			.insert(user)
			.values(userDto)
			.returning({ id: user.id });
		return mutationResult;
	},
	findOneByEmail: async (db: Database, email: string) => {
		const queryResult = await db.query.user.findFirst({
			where: eq(user.email, email),
		});

		return queryResult;
	},
};

export default userService;
