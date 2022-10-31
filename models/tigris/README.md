# Automatically bootstrap Tigris Databases and Collections

This project uses a file-system based bootstrap of databases and collections. Tigris schema manager
will scan all the folders and files in `<project root>/models/tigris` to automatically
provision Database and Collections.

By default, the files and folders inside `<project root>/models/tigris` will be scanned for any
Database/Collection definition. User can choose to override/change this path by simply passing 
`--schemaroot="<my/custom/path>"` argument during build time. For example:

```shell
# dev
$> npm run dev --schemaroot="lib/models"
# schema manager will only use "<project root>/lib/models" directory to look up and provision any schema definitions

# prod
$> npm run build --schemaroot="lib/models"
```

## Folders and Files inside `<project root>/models/tigris`
Let's take a look at following directory structure:

```text
<project root>
└── models
    └── tigris
        └── catalog
            ├── products.ts
            └── orders.ts
```
- **Folders** are used to define Databases. In this example, a Database named `catalog` will be created
if it does not exist already.
- **Files** inside folders are used to represent Collections in the respective Database. From the example,
two collections named `products` and `orders` will be provisioned inside already created `catalog` 
Database conforming to the schema defined in typescript files `products.ts` and `orders.ts`. Following is
an example schema definition in `products.ts`.

```typescript
import {
  TigrisCollectionType,
  TigrisDataTypes,
  TigrisSchema
} from '@tigrisdata/core/dist/types'

export interface Product extends TigrisCollectionType {
  id?: number;
  title: string;
  description: string;
  price: number;
}

export const ProductSchema: TigrisSchema<Product> = {
  id: {
    type: TigrisDataTypes.INT32,
    primary_key: { order: 1, autoGenerate: true }
  },
  title: { type: TigrisDataTypes.STRING },
  description: { type: TigrisDataTypes.STRING },
  price: { type: TigrisDataTypes.NUMBER }
}
```

## FAQs

<details>
<summary>Q - Will a Database be provisioned if it already exists?</summary>

- No. A new Database will not be created if one with the same name exists.
</details>

<details>
<summary>Q - Will a new Collection be provisioned if it already exists?</summary>

- No. A new Collection will not be provisioned. However, Tigris will attempt to modify the already provisioned
schema if there are changes. [Learn more about schema modification in Tigris](https://docs.tigrisdata.com/documents/schema-modification)
</details>

<details>
<summary>Q - What happens if there are no valid schema files in Database folder?</summary>

- A Database will still be provisioned. Empty or invalid Collection schema definitions will be ignored.
</details>

<details>
<summary>Q - Will a Database/Collection be deleted if corresponding Folder/File is removed?</summary>

- No. Users are responsible to remove/delete any provisioned resources.
</details>

<details>
<summary>Q - Is using Tigris schema manager required?</summary>

- No. Schema manager can be disabled from `package.json` or the directory could be left empty. This is
just one convenient method.
</details>

<details>
<summary>Q - How can I disable automatic schema provisioning?</summary>

- Schema manager can be disabled from executing in `dev` or `build` scripts in `package.json`.
</details>
