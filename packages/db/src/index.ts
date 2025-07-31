import { State, makeSchema } from '@livestore/livestore';

import { materializers } from './materializers';
import { tables } from './tables';
import { events } from './events';

const state = State.SQLite.makeState({ tables, materializers });

export const schema = makeSchema({ events, state });
