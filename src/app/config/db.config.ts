import { DBConfig } from "ngx-indexed-db";

export const dbName: string = 'myDb';
export const dbVersion: number = 1;
export const storeName: string = 'people';

export const databaseConfig: DBConfig = {
    name: dbName,
    version: dbVersion,
    objectStoresMeta: [{
        store: storeName,
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
            { name: 'name', keypath: 'name', options: { unique: false } },
            { name: 'email', keypath: 'email', options: { unique: true } }
        ]
    }]
};