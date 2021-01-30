import {
    IDbClient,
    IDatabase,
    ICollection,
    IRecord,
} from '@chunchun-db/shared';

import { IConnectOptions } from './IConnectOptions';
import { DbClient } from './DbClient';

export const connect: (options: IConnectOptions) => Promise<IDbClient> =
    DbClient.connect;

export { IConnectOptions, IDbClient, IDatabase, ICollection, IRecord };
