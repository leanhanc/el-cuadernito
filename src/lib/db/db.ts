import Dexie from 'dexie';

/* Types */
import type { EntityTable } from 'dexie';
import type { Asset } from '../types';

const db = new Dexie('el-cuadernito') as Dexie & {
	assets: EntityTable<Asset, 'id'>;
};

db.version(0.1).stores({
	assets: '++id, amount, udpdatedAt, assetType, currency, holder',
});

export default db;
