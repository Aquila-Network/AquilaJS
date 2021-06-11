import * as BSON from 'bson';

import { Document } from './Document';
import { Request } from './Request';
import { Schema } from './Schema';
import { Wallet } from './Wallet';

interface CreateDatabasePayload<T> {
    data: {
        schema: T;
    },
    signature: string;
}

interface CreateDatabaseResponse {
    database_name: string;
}

interface CreateDocsPayload<T> {
    data: {
        docs: {
            payload: Document<T>,
            signature: string,
        }[],
        database_name: string;
    },
    signature: string;
}

interface CreateDocsResponse {
    success: boolean;
    ids: string[];
}

interface DeleteDocsPayload {
    data: {
        ids: string[] | string;
        database_name: string;
    }
    signature: string;
}

interface DeleteDocsResponse {
    success: boolean;
    ids: string[];
}

interface SearchDocsPayload {
    data: {
        database_name: string;
        matrix: number[][];
        k: number;
    },
    signature: string;
}

export interface SearchDocsResult<T> {
    docs: T[][];
    dists: number[][];
}

interface SearchDocsResponse<T> extends SearchDocsResult<T> {
    success?: boolean;
}

export class Db {

    private request: Request;

    public constructor(
        url: string,
        port: number,
        private wallet: Wallet
    ) {
        this.request = new Request(url, port);        
    }

    public async connect(): Promise<void> {
        await this.request.checkConnection();
    }

    public async createDatabase(schema: Schema): Promise<string> {
        const schemaData = { schema };
        const bsonData = BSON.serialize(schemaData); 
        const signature = this.wallet.signBsonData(bsonData);
        const data: CreateDatabasePayload<Schema> = {
            data: schemaData,
            signature,
        };
        const responseData = await this.request.post<CreateDatabaseResponse, CreateDatabasePayload<Schema>>('/db/create', data);
        return responseData["database_name"];
    }

    public async createDocuments<T>(dbName: string, docs: Document<T>[]): Promise<string[]> {
        const signedDocs = docs.map(item => {
            const payload = item;
            const signature = this.wallet.signBsonData(BSON.serialize(item));
            return {
                payload,
                signature 
            };
        });
        const docData = { docs: signedDocs, database_name: dbName };
        const bsonData = BSON.serialize(docData);
        const signature = this.wallet.signBsonData(bsonData);
        const data: CreateDocsPayload<T> = {
            data: docData,
            signature
        };
        const responseData = await this.request.post<CreateDocsResponse, CreateDocsPayload<T>>("/db/doc/insert", data);
        if(responseData["success"]) {
            return responseData["ids"];
        }else {
            throw Error("Faied");
        }
    }

    public async deleteDocuments(dbName: string, ids: string[]): Promise<string[]> {
        const deleteData = {ids, database_name: dbName}; 
        const bsonData = BSON.serialize(deleteData);
        const signature = this.wallet.signBsonData(bsonData);
        const data = {
            data:deleteData,
            signature
        }
        const responseData = await this.request.post<DeleteDocsResponse, DeleteDocsPayload>("/db/doc/delete", data);
        if(responseData["success"]) {
            return responseData["ids"];
        }else {
            throw Error("Faied");
        }
    }

    public async searchKDocuments<T>(dbName: string, matrix: number[][], k: number): Promise<SearchDocsResult<T>> {
        const searchData = {
            database_name: dbName,
            matrix,
            k,
        };
        const bsonData = BSON.serialize(searchData);
        const signature = this.wallet.signBsonData(bsonData);
        const data = {
            data: searchData,
            signature,
        };
        const responseData = await this.request.get<SearchDocsResponse<T>, SearchDocsPayload>('/db/search', data);
        if(responseData["success"]) {
            return {
                docs: responseData["docs"],
                dists: responseData["dists"]
            };
        }else {
            throw new Error("Something went wrong");
        }
    }
} 