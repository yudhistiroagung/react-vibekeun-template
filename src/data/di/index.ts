import './profile-di';
import './goal-di';
import './task-di';

import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/dexie/db-dexie';
import TodoLocalDb from '../todos/datasources/local/db';
import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from '../todos/datasources/remote/todo-remote-datasource';

/**
 * Inject Local Databases
 */
container.register(
  ...AppDatabase.provideTable(TodoLocalDb.TOKEN, TodoLocalDb.TABLE_NAME),
);

/**
/**
 * Inject Local/Remote Data Sources
 */
container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
container.register(TodoRemoteDatasource.TOKEN, TodoRemoteDatasource);
