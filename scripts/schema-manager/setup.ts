import { Tigris, TigrisClientConfig } from '@tigrisdata/core';
import { loadEnvConfig } from '@next/env';
import * as Log from './logger';
import { loadTigrisManifest } from './manifest-loader';

// Run the config loader only when not executing within next runtime
if (process.env.NODE_ENV === undefined) {
  if (process.env.APP_ENV === 'development') {
    loadEnvConfig(process.cwd(), true);
  } else if (process.env.APP_ENV === 'production') {
    loadEnvConfig(process.cwd());
  }
}

async function main() {
  const tigrisFileManifest = loadTigrisManifest();
  if (!process.env.TIGRIS_URI) {
    Log.error('Cannot find TIGRIS_URI environment variable ');
    process.exit(1);
  }
  // setup client
  const tigrisClient = new Tigris();
  Log.info(`Using Tigris at ${process.env.TIGRIS_URI}`);

  for (const dbManifest of tigrisFileManifest) {
    // create DB
    const tigrisDb = await tigrisClient.createDatabaseIfNotExists(dbManifest.dbName);
    Log.event(`Created database: ${dbManifest.dbName}`);

    for (const coll of dbManifest.collections) {
      // Create a collection
      const collection = await tigrisDb.createOrUpdateCollection(coll.collectionName, coll.schema);
      Log.event(
        `Created collection: ${collection.collectionName} from schema: ${coll.schemaName} in db: ${dbManifest.dbName}`
      );
    }
  }
}

main();
