import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/dexie/db-dexie';
import TodoLocalDb from '../todos/datasources/local/db';
import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from '../todos/datasources/remote/todo-remote-datasource';
import { LogLocalDatasource } from '../logs/datasources/local/log-local-datasource';

/**
 * Inject Local Databases
 */
container.register(
  ...AppDatabase.provideTable(TodoLocalDb.TOKEN, TodoLocalDb.TABLE_NAME),
);
container.register(...AppDatabase.provideTable('goals', 'goals'));
container.register(...AppDatabase.provideTable('logs', 'logs'));

/**
 * Inject Local/Remote Data Sources
 */
container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
container.register(TodoRemoteDatasource.TOKEN, TodoRemoteDatasource);
container.register(LogLocalDatasource.TOKEN, LogLocalDatasource);
