import { NeonHttpDatabase } from 'drizzle-orm/neon-http';
import schema from '@lib/db/schema';

export type Database = NeonHttpDatabase<typeof schema>;
