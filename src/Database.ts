import axios from 'axios';

import { ICollection, IDatabase, IRecord } from '@chunchun-db/shared/dist';

import { Colection } from './Collection';

export class Database implements IDatabase {
    constructor(private url: string, public name: string) {}

    getDbUrl() {
        return `${this.url}/db/${this.name}`;
    }

    async rename(newName: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async createCollection<T extends IRecord>(
        name: string
    ): Promise<ICollection<T>> {
        axios.put(`${this.url}/db/${this.name}/collections/create`, {
            params: { name },
        });

        return new Colection<T>(this.getDbUrl(), name);
    }

    async getCollection<T extends IRecord>(
        name: string
    ): Promise<ICollection<T>> {
        axios.put(`${this.url}/db/${this.name}/collections/get`, {
            params: { name },
        });

        return new Colection<T>(this.getDbUrl(), name);
    }
}
