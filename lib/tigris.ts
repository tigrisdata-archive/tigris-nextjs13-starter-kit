import { DB, Tigris } from '@tigrisdata/core';
import { Log } from '@tigrisdata/core/dist/utils/logger';

const DB_NAME = 'nextjsTodoApp';

if (!process.env.TIGRIS_URI) {
  throw new Error('Cannot find TIGRIS_URI environment variable ');
}
Log.info(`Using Tigris at: ${process.env.TIGRIS_URI}`);

declare global {
  // eslint-disable-next-line no-var
  var tigrisDb: DB;
}

let tigrisDb: DB;

if (process.env.NODE_ENV !== 'production') {
  // re-use the same connection in dev
  if (!global.tigrisDb) {
    const tigrisClient = new Tigris();
    global.tigrisDb = tigrisClient.getDatabase(DB_NAME);
  }
  tigrisDb = global.tigrisDb;
} else {
  const tigrisClient = new Tigris();
  tigrisDb = tigrisClient.getDatabase(DB_NAME);
}

// export to share DB across modules
export default tigrisDb;
