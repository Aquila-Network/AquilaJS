# AquilaJS
Javascript client library for Aquila Network 

## Connect to Database and Hub
```js
import { AquilaClient, Wallet, Db, Hub } from 'aquila-js';

const wallet = new Wallet('DB_PRIVATE_KEY_PATH-HERE');
const dbUrl = 'DB_URL-HERE';
const dbPort = 'DB_PORT--HERE';
const hubWallet = new Wallet('HUB_PRIVATE_KEY_PATH-HERE');
const hubUrl = 'HUB_URL-HERE';
const hubPort = 'HUB_PORT-HERE';

// connecting to aquila db server
AquilaClient.getDbServer(dbUrl, dbPort, wallet).then(db => {
	// connected
});
// connecting to aquila hub server
AquilaClient.getHubServer(hubUrl, hubPort, hubWallet).then(hub => {
	// connected
});
```

## Create Database

```js
const schema: Schema = {
		description: "description of db",
		unique: "r8and0mse---",
		encoder: "ftxt:https://encoder-url",
		codelen: 500,
		metadata: {
				"key": "value",
		}
};
db.createDatabase(schema).then(dbName => {
	// done
})
hub.createDatabase(schema).then(dbNameHub => {
	// done
})
```

## Create Document

```js
const dbName = 'db-name';
const data = ['Amazon', 'Google'];
const generatedCode = hub.compressDocument(dbName, data).then((generatedCode: as number[][]) => {
	const docs: Document<DocMetaData>[] = [
		{
				metadata: {
						name: "name test",
						age: 20
				},
				code: generatedCode[0],
		},{
				metadata: {
						name: "name2 test",
						age: 32
				},
				code: generatedCode[1],
		}
	];
	return db.createDocuments(dbName, docs)
}).then(docs => {
	// succes	
});
	
```

## Search Documents

```js
const searchData = [[0.06443286, 0.106639  , 0.81865615]];
const resultCount = 10;
db.searchKDocuments<DocMetaData>(dbName[0], searchData, resultCount).then(result => {
	// success
});
```

## Delete Document

```js
db.deleteDocuments(dbName[0], deleteIds).then(result => {
// success
});
```
