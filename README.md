<div align="center">
  <a href="https://aquila.network">
    <img
      src="https://user-images.githubusercontent.com/19545678/133918727-5a37c6be-676f-427b-8c86-dd50f58d1287.png"
      alt="Aquila Network Logo"
      height="64"
    />
  </a>
  <br />
  <p>
    <h3>
      <b>
        Aquila JS
      </b>
    </h3>
  </p>
  <p>
    <b>
      Javascript client to access Aquila Network Neural Search Engine
    </b>
  </p>
  <br/>
</div>

Here is a bird's eye view of where Aquila Client Libraries fit in the entire ecosystem:
<div align="center">
  <img
    src="https://user-images.githubusercontent.com/19545678/133918436-63c39f8a-aa6c-4d7c-939a-20e35cc8b2c2.png"
    alt="Aquila client libraries"
    height="400"
  />
 <br/>
</div>

## Connect to Database and Hub
```ts
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

```ts
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

```ts
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

```ts
const searchData = [[0.06443286, 0.106639  , 0.81865615]];
const resultCount = 10;
db.searchKDocuments<DocMetaData>(dbName[0], searchData, resultCount).then(result => {
	// success
});
```

## Delete Document

```ts
db.deleteDocuments(dbName[0], deleteIds).then(result => {
// success
});
```
