import { container } from 'tsyringe';

import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';

import '@/data/di';

const repositories = {
  todoRepository: container.resolve(TodoRepositoryImpl),
};

export default {
  repositories,
};
