import axios from 'axios';

import { ICollection, IDatabase, IRecord } from '@chunchun-db/shared';

import { Collection } from './Collection';

export class Database implements IDatabase {
    constructor(private url: string, public name: string) {}

    getDbUrl() {
        return `${this.url}/db/${this.name}/collections`;
    }

    async rename(newName: string): Promise<void> {
        throw new Error('Method not implemented.');
    }

    async createCollection<T extends IRecord>(
        name: string
    ): Promise<ICollection<T>> {
        axios.put(`${this.url}/db/${this.name}/collections/create`, { name });

        return new Collection<T>(this.getDbUrl(), name);
    }

    async getCollection<T extends IRecord>(
        name: string
    ): Promise<ICollection<T>> {
        axios.get(`${this.url}/db/${this.name}/collections/checkIfExist`, {
            params: { name },
        });

        return new Collection<T>(this.getDbUrl(), name);
    }

    async getAllCollections(): Promise<ICollection<IRecord>[]> {
        const collections = (await axios
            .get(`${this.url}/db/${this.name}/collections/getAll`)
            .then((res) => res.data)) as { name: string }[];

        return collections.map(
            ({ name }) => new Collection<IRecord>(this.getDbUrl(), name)
        );
    }
}
