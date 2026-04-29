import { container } from 'tsyringe';

import { TodoLocalDatasource } from '../todos/datasources/local/todo-local-datasource';
import { TodoRemoteDatasource } from '../todos/datasources/remote/todo-remote-datasource';

import '../todos/datasources/local/db';

/**
 * register class with token
 * */
container.register(TodoLocalDatasource.TOKEN, TodoLocalDatasource);
container.register(TodoRemoteDatasource.TOKEN, TodoRemoteDatasource);
