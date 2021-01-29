import { IDbClient } from '@chunchun-db/shared/dist/IDbClient';

import { IConnectOptions } from './IConnectOptions';
import { DbClient } from './DbClient';

export const connect: (options: IConnectOptions) => Promise<IDbClient> =
    DbClient.connect;

export { IConnectOptions, IDbClient };
