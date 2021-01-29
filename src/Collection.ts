import axios from 'axios';

import { IRecord } from '@chunchun-db/shared/dist/IRecord';
import { ICollection } from '@chunchun-db/shared/dist/ICollection';

export class Colection<T extends IRecord> implements ICollection<T> {
    constructor(private url: string, public name: string) {}

    async getAll(): Promise<T[]> {
        return axios.get(`${this.url}/${this.name}/getAll`);
    }

    add(items: Pick<T, Exclude<keyof T, 'id'>>[]): Promise<void> {
        return axios.post(`${this.url}/${this.name}/add`, items);
    }
    remove(items: T['id'][]): Promise<void> {
        return axios.delete(`${this.url}/${this.name}/remove`, { data: items });
    }
    update(item: T): Promise<void> {
        return axios.put(`${this.url}/${this.name}/update`, item);
    }
}
