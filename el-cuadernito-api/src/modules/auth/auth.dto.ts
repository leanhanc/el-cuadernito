import { BaseDto } from '@lib/types';

export interface SignUpDto extends BaseDto {
	email: string;
	password: string;
}
