import { WithDatabase } from '@lib/types/dto';

export interface SignInDto extends WithDatabase {
	code: string;
	googleClientId: string;
	googleClientSecret: string;
	tokenSecret: string;
}
