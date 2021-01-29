import axios from 'axios';
import { IDatabase } from '@chunchun-db/shared/dist/IDatabase';
import { IDbClient } from '@chunchun-db/shared/dist/IDbClient';

import { IConnectOptions } from './IConnectOptions';
import { Database } from './Database';

export class DbClient implements IDbClient {
    static async connect(options: IConnectOptions) {
        const url = `${options.host || 'http://localhost'}:${
            options.port
        }/api/v1`;

        await axios.get(`${url}/checkAvailability`);

        return Promise.resolve(new DbClient(url));
    }

    private constructor(private url: string) {}

    async getDatabase(name: string): Promise<IDatabase> {
        await axios.get(`${this.url}/db/checkIfExist`);

        return new Database(this.url, name);
    }

    async createDatabase(name: string): Promise<IDatabase> {
        await axios.get(`${this.url}/db/create`, { params: { name } });

        return new Database(this.url, name);
    }

    dropDatabase(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
