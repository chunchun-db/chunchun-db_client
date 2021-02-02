import axios from 'axios';

import { IRecord, ICollection } from '@chunchun-db/shared';

export class Collection<T extends IRecord> implements ICollection<T> {
    constructor(private url: string, public name: string) {}

    async getAll(): Promise<T[]> {
        return axios
            .get(`${this.url}/${this.name}/getAll`)
            .then((res) => res.data);
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

    async removeAll() {
        await axios.delete(`${this.url}/${this.name}/removeAll`);
    }
}
