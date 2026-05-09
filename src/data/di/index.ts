import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/dexie/db-dexie';

import TodoLocal from '../todos/datasources/local/db';
import UserLocal from '../users/datasources/local/db';

import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from '../todos/datasources/remote/todo-remote-datasource';
import { UserLocalDatasource } from '../users/datasources/local/user-local-datasource';

/**
 * Inject Local Databases
 */
container.register(
  ...AppDatabase.provideTable(TodoLocal.TOKEN, TodoLocal.TABLE_NAME),
);
container.register(
  ...AppDatabase.provideTable(UserLocal.TOKEN, UserLocal.TABLE_NAME),
);

/**
 * Inject Local/Remote Data Sources
 */
container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
container.register(TodoRemoteDatasource.TOKEN, TodoRemoteDatasource);
container.register(UserLocalDatasource.TOKEN, UserLocalDatasource);
