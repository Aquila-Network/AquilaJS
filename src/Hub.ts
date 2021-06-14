import * as BSON from 'bson';

import { Request } from "./Request";
import { Schema } from "./Schema";
import { Wallet } from "./Wallet";

interface CreateDatabasePayload<T> {
    data: {
        schema: T;
    },
    signature: string;
}

interface CreateDatabaseResponse {
    databaseName: string;
}

interface CompressDocumentPayload<T> {
    data: {
        databaseName: string,
        text: T
    }
}

interface CompressDocumentResponse {
    vectors: number[]; 
    success: boolean;
}

export class Hub {
    private request: Request;
    constructor(
        private host: string,
        private port: number,
        private wallet: Wallet
    ) {
        this.request = new Request(this.host, this.port);
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
        const responseData = await this.request.post<CreateDatabaseResponse, CreateDatabasePayload<Schema>>('/prepare', data);
        return responseData["databaseName"];
    }

    public async compressDocument<T>(dbName: string, data: T): Promise< number[] | number[][]> {
        const reqData = {
            data: {
                databaseName: dbName,
                text:  data
            }
        };
        const response = await this.request.post<CompressDocumentResponse, CompressDocumentPayload<T>>('/compress', reqData);
        if(!response.success) {
            throw new Error('Compression failed');
        }
        return response.vectors;
    }
}