import { Field, PrimaryKey, TigrisCollection, TigrisCollectionType, TigrisDataTypes } from '@tigrisdata/core';

export const ITEMS_COLLECTION_NAME = 'todoItems';

@TigrisCollection(ITEMS_COLLECTION_NAME)
export class TodoItem implements TigrisCollectionType {
  @PrimaryKey(TigrisDataTypes.INT32, { order: 1, autoGenerate: true })
  id!: number;

  @Field()
  text!: string;

  @Field()
  completed!: boolean;
}
