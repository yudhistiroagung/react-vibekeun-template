import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/database/db-dexie';

import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from '../todos/datasources/remote/todo-remote-datasource';

import { TodoLocalDB, TodoTableName } from '../todos/datasources/local/db';

/**
 * Inject Local Databases
 */
container.register(TodoLocalDB, {
  useFactory: (c) => c.resolve(AppDatabase).table(TodoTableName),
});

/**
 * Inject Local/Remote Data Sources
 */
container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
container.register(TodoRemoteDatasource.TOKEN, TodoRemoteDatasource);
