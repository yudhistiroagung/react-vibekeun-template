import { container } from 'tsyringe';

import '@/data/di';

import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';

const repositories = {
  todoRepository: container.resolve(TodoRepositoryImpl),
};

export default {
  repositories
}
