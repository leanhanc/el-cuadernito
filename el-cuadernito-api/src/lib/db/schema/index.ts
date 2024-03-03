import * as asset from './asset';
import * as user from './user';

const dbSchema = { ...asset, ...user };

export default dbSchema;
