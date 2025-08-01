import { State, makeSchema } from '@livestore/livestore';

import { tables } from './tables';
import { events } from './events';
import { materializers } from './materializers';

const state = State.SQLite.makeState({ tables, materializers });

export { tables, events, materializers };
export const schema = makeSchema({ events, state });
export type DbSchema = typeof schema;
