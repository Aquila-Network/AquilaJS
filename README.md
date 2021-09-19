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
