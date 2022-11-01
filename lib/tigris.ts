import { DB, Tigris, TigrisClientConfig } from '@tigrisdata/core';
import { DB_NAME } from './schema';

if (!process.env.TIGRIS_URI) {
  throw new Error('Cannot find TIGRIS_URI environment variable ');
}

const tigrisUri = process.env.TIGRIS_URI;
const clientConfig: TigrisClientConfig = { serverUrl: tigrisUri };

if (process.env.TIGRIS_CLIENT_ID) {
  clientConfig.clientId = process.env.TIGRIS_CLIENT_ID;
}
if (process.env.TIGRIS_CLIENT_SECRET) {
  clientConfig.clientSecret = process.env.TIGRIS_CLIENT_SECRET;
}

declare global {
  // eslint-disable-next-line no-var
  var tigrisDb: DB;
}

let tigrisDb: DB;

if (process.env.NODE_ENV === 'development') {
  // re-use the same connection in dev
  if (!global.tigrisDb) {
    const tigrisClient = new Tigris(clientConfig);
    global.tigrisDb = tigrisClient.getDatabase(DB_NAME);
  }
  tigrisDb = global.tigrisDb;
} else {
  const tigrisClient = new Tigris(clientConfig);
  tigrisDb = tigrisClient.getDatabase(DB_NAME);
}

// export to share DB across modules
export default tigrisDb;
