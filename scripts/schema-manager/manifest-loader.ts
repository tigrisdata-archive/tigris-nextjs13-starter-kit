import { TigrisSchema } from '@tigrisdata/core/dist/types';
import path from 'path';
import fs from 'fs';
import * as Log from './logger';

const SCHEMAS_ROOT = 'models';
const DB_DIR_SUFFIX = '-db';
const COLL_FILE_SUFFIX = '-schema.ts';

type CollectionManifest = {
  collectionName: string;
  schemaName: string;
  schema: TigrisSchema<any>;
};

type DatabaseManifest = {
  dbName: string;
  collections: Array<CollectionManifest>;
};

type TigrisManifest = Array<DatabaseManifest>;

/**
 * Loads the databases and schema definitions from file structure to
 * create databases and collections
 */
export function loadTigrisManifest(): TigrisManifest {
  Log.event(`Scanning ${SCHEMAS_ROOT} for schema definitions`);
  const PKG_ROOT = process.env.PWD as string;
  Log.debug(`PKG_ROOT: ${PKG_ROOT}`);
  const SCHEMAS_PATH = path.join(PKG_ROOT, SCHEMAS_ROOT);
  Log.debug(`SCHEMAS_PATH: ${SCHEMAS_PATH}`);

  if (!fs.existsSync(SCHEMAS_PATH)) {
    Log.error(`Invalid path for Tigris schema: ${SCHEMAS_ROOT}`);
    process.exit(1);
  }

  const tigrisFileManifest: TigrisManifest = new Array<DatabaseManifest>();

  // load manifest
  for (const schemaPathEntry of fs.readdirSync(SCHEMAS_PATH)) {
    if (schemaPathEntry.endsWith(DB_DIR_SUFFIX)) {
      const dbDirPath = path.join(SCHEMAS_PATH, schemaPathEntry);
      if (fs.lstatSync(dbDirPath).isDirectory()) {
        Log.info(`Found DB definition ${schemaPathEntry}`);
        const dbName = schemaPathEntry.substring(0, schemaPathEntry.length - DB_DIR_SUFFIX.length);
        const dbManifest: DatabaseManifest = {
          dbName: dbName,
          collections: new Array<CollectionManifest>()
        };

        for (const dbPathEntry of fs.readdirSync(dbDirPath)) {
          if (dbPathEntry.endsWith(COLL_FILE_SUFFIX)) {
            const collFilePath = path.join(dbDirPath, dbPathEntry);
            if (fs.lstatSync(collFilePath).isFile()) {
              Log.info(`Found Schema file ${dbPathEntry} in ${schemaPathEntry}`);
              const collName = dbPathEntry.substring(0, dbPathEntry.length - COLL_FILE_SUFFIX.length);
              const schemaFile = require(collFilePath);
              for (const [key, value] of Object.entries(schemaFile)) {
                if (isValidSchema(value)) {
                  dbManifest.collections.push({
                    collectionName: collName,
                    schema: value as TigrisSchema<any>,
                    schemaName: key
                  });
                  Log.info(`Found schema definition: ${key}`);
                  break;
                }
              }
            }
          }
        }
        if (dbManifest.collections.length === 0) {
          Log.warn(`No valid schema definition found in ${schemaPathEntry}`);
        }
        tigrisFileManifest.push(dbManifest);
      }
    }
  }

  Log.debug(`Generated Tigris Manifest: ${JSON.stringify(tigrisFileManifest)}`);
  return tigrisFileManifest;
}

/**
 * Validate if given input is of {@link TigrisSchema} type
 *
 * @param maybeSchema
 */
function isValidSchema(maybeSchema: any): boolean {
  if (maybeSchema === null || typeof maybeSchema !== 'object') {
    return false;
  }
  for (const value of Object.values(maybeSchema)) {
    if (value === null || typeof value !== 'object') {
      return false;
    }
    if (!value.hasOwnProperty('type')) {
      return false;
    }
  }
  return true;
}
