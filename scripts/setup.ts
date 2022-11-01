import { COLLECTION_NAME, DB_NAME, TodoItemSchema } from '../lib/schema';
import { Tigris, TigrisClientConfig } from '@tigrisdata/core';
import { loadEnvConfig } from '@next/env';

// Run the config loader only when not executing within next runtime
if (process.env.NODE_ENV === undefined) {
  if (process.env.APP_ENV === 'development') {
    loadEnvConfig(process.cwd(), true);
  } else if (process.env.APP_ENV === 'production') {
    loadEnvConfig(process.cwd());
  }
}

async function main() {
  if (!process.env.TIGRIS_URI) {
    console.log('Cannot find TIGRIS_URI environment variable ');
    process.exit(1);
  }
  // setup client
  const tigrisUri = process.env.TIGRIS_URI;
  const clientConfig: TigrisClientConfig = { serverUrl: tigrisUri };

  if (process.env.TIGRIS_CLIENT_ID) {
    clientConfig.clientId = process.env.TIGRIS_CLIENT_ID;
  }
  if (process.env.TIGRIS_CLIENT_SECRET) {
    clientConfig.clientSecret = process.env.TIGRIS_CLIENT_SECRET;
  }
  const tigrisClient = new Tigris(clientConfig);
  console.log(`Using Tigris at ${tigrisUri}`);

  // create DB
  const tigrisDb = await tigrisClient.createDatabaseIfNotExists(DB_NAME);
  console.log(`Created database: ${DB_NAME}`);

  // create collection
  const collection = await tigrisDb.createOrUpdateCollection(COLLECTION_NAME, TodoItemSchema);
  console.log(`Created collection: ${collection.collectionName}`);
}

main();
