import { Db } from "./Db";
import { Hub } from "./Hub";
import { Wallet } from "./Wallet";

export class AquilaClient {

    private static dbs: { key: string, dbServer: Db }[] = [];
    private static hubs: { key: string, hubServer: Hub}[] = [];

    public static async getDbServer(host: string, port: number, wallet: Wallet): Promise<Db> {
        const db = AquilaClient.dbs.find(item => item.key === `${host}:${port}`);
        if(db) {
            return db.dbServer;
        }
        const dbServer = new Db(host, port, wallet); 
        await dbServer.connect();
        const newServer = {
            key: `${host}:${port}`,
            dbServer
        };
        AquilaClient.dbs.push(newServer);
        return dbServer;
    }

    public static async getHubServer(host: string, port: number, wallet: Wallet): Promise<Hub> {
        const hub = AquilaClient.hubs.find(item => item.key === `${host}:${port}`);
        if(hub) {
            return hub.hubServer;
        }
        const hubServer = new Hub(host, port, wallet); 
        await hubServer.connect();
        const newServer = {
            key: `${host}:${port}`,
            hubServer
        };
        AquilaClient.hubs.push(newServer);
        return hubServer;
    }
}