import axios from 'axios';
import { IDatabase, IDbClient } from '@chunchun-db/shared';

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
        const isExist = await axios.get(`${this.url}/db/checkIfExist`, {
            params: { name },
        });

        if (!isExist) {
            throw new Error(`database with name "${name} does not exist`);
        }

        return new Database(this.url, name);
    }

    async getAllDatabases(): Promise<IDatabase[]> {
        const dbs = (await axios
            .get(`${this.url}/db/getAll`)
            .then((res) => res.data)) as { name: string }[];

        return dbs.map(({ name }) => new Database(this.url, name));
    }

    async createDatabase(name: string): Promise<IDatabase> {
        await axios.put(`${this.url}/db/create`, { name });

        return new Database(this.url, name);
    }

    dropDatabase(): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
