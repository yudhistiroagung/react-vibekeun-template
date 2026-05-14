---
name: how-to-create-local-datasource
description: create NEW local datasource on data layer.
---

Use this skill when we want to create NEW local datasource on data layer.

## Instruction
When creating a new datasource, we need to follow the steps:
- **Step 1:** Create folder under `src/data/{data-name}/datasources/` if not exist
- **Step 2:** Create interface `src/data/{data-name}/datasources/{data-name}-datasource.ts` if not exist
- **Step 3:** for local datasource, create folder under `src/data/{data-name}/datasources/local/`

## Local datasource
- **Step 1:** For dexie table, create `index.ts` file `src/data/{data-name}/datasources/local/db/index.ts`
- **Step 2:** Create class implementation for local data source under `src/data/{data-name}/datasources/local/{data-name}-local-datasource.ts`

## Local DB Source (table)
we are using dexie as database, and this db folder is providing table name and schema. Also `TOKEN` name used for dependency injection.
Example:
```ts
import type { Table } from 'dexie';

import type { TodoEntity } from '../../../models'; // example of model entity

export type TodoTable = Table<TodoEntity>;
export default {
  TOKEN: 'TodoLocalDBToken',
  TABLE_NAME: 'todos',
};
```

## Local Datasource Implementation
- **Step 1:** Create class implementation for local data source under `src/data/{data-name}/datasources/local/{data-name}-local-datasource.ts`
Example:
```ts
import { inject, singleton } from 'tsyringe';

import type { TodoEntity } from '../../models/todo-entity';
import type { TodoDataSource } from '../todo-datasource';
import TodoLocalDb, { type TodoTable } from './db';

@singleton()
export class TodoLocalDatasource implements TodoDataSource<TodoEntity> {
  static readonly TOKEN = 'TodoLocalDatasource'; // {data-name}LocalDatasource

  constructor(@inject(TodoLocalDb.TOKEN) private readonly todos: TodoTable) {}

  async setTodos(todos: TodoEntity[]): Promise<void> {
    return this.todos.bulkAdd(todos);
  }

  async getTodos() {
    return this.todos.toArray();
  }
}
```

## Register local db in DI container
- **Step 1:** import local db config from `../{data-name}/datasources/local/db` with name `{data-name}LocalDb`;
- **Step 2:** Register local datasource in DI container into `src/data/di/index.ts` file
Example:
```ts
import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/dexie/db-dexie';

import TodoLocalDb from '../todos/datasources/local/db';

container.register(
  ...AppDatabase.provideTable(TodoLocalDb.TOKEN, TodoLocalDb.TABLE_NAME),
);
```
## Register local datasource implementation in DI container
- **Step 1:** import local datasource implementation from `../{data-name}/datasources/local/{data-name}-local-datasource.ts` with name `{data-name}LocalDatasource`;
- **Step 2:** Register local datasource implementation in DI container into `src/data/di/index.ts` file
Example:
```ts
import { container } from 'tsyringe';

import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';

container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
```

## Register new table name
- **Step 1:** on file `src/cores/dexie/db-dexie.ts`, define new table name in `AppDatabase` class
- **Step 2:** add new table in `initiate()` function, and add necessary field name for indexing

## Folder Structure for local datasource
```
src/
├── data/
|   └── products/
|       └── datasources/
|         ├── product-datasource.ts
|         ├──local/
|           ├── db/
|           | └── index.ts
|           └── product-local-datasource.ts
```


