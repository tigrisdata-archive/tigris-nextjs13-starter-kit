import { TigrisSchema } from '@tigrisdata/core/dist/types';
import path from 'path';
import fs from 'fs';
import * as Log from './logger';

const DEFAULT_SCHEMAS_ROOT = 'models/tigris';
const COLL_FILE_SUFFIX = '.ts';

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
  Log.event(`Scanning ${DEFAULT_SCHEMAS_ROOT} for Tigris schema definitions`);
  const pkgRoot = process.env.PWD as string;
  Log.debug(`PKG_ROOT: ${pkgRoot}`);
  const schemaRoot = process.env.npm_config_schemaroot || DEFAULT_SCHEMAS_ROOT;
  const schemasPath = path.join(pkgRoot, schemaRoot);
  Log.debug(`SCHEMAS_PATH: ${schemasPath}`);

  if (!fs.existsSync(schemasPath)) {
    Log.error(`Invalid path for Tigris schema: ${schemaRoot}`);
    process.exit(1);
  }

  const tigrisFileManifest: TigrisManifest = new Array<DatabaseManifest>();

  // load manifest
  for (const schemaPathEntry of fs.readdirSync(schemasPath)) {
    const dbDirPath = path.join(schemasPath, schemaPathEntry);
    if (fs.lstatSync(dbDirPath).isDirectory()) {
      Log.info(`Found DB definition ${schemaPathEntry}`);
      const dbManifest: DatabaseManifest = {
        dbName: schemaPathEntry,
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
