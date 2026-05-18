import './profile-di';
import './goal-di';
import './task-di';

import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/dexie/db-dexie';
import { TodoRepository } from '@/domain/todos/todo-repository';
import { GoalRepositoryImpl } from '../goals/goal-repository-impl';
import { ProfileRepositoryImpl } from '../profiles/profile-repository-impl';
import { TaskRepositoryImpl } from '../tasks/task-repository-impl';
import TodoLocalDb from '../todos/datasources/local/db';
import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from '../todos/datasources/remote/todo-remote-datasource';
import { TodoRepositoryImpl } from '../todos/todo-repository-impl';

/**
 * Inject Local Databases tables
 */
container.register(
  ...AppDatabase.provideTable(TodoLocalDb.TOKEN, TodoLocalDb.TABLE_NAME),
);

/**
 * Register Datasources
 */
container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
container.register(TodoRemoteDatasource.TOKEN, TodoRemoteDatasource);

/**
 * Register Repositories
 */
container.register(TodoRepository.TOKEN, TodoRepositoryImpl);

export default {
  todoRepository: container.resolve(TodoRepositoryImpl),
  taskRepository: container.resolve(TaskRepositoryImpl),
  profileRepository: container.resolve(ProfileRepositoryImpl),
  goalRepository: container.resolve(GoalRepositoryImpl),
};
