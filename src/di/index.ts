import { container } from 'tsyringe';

import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';
import { UserRepositoryImpl } from '@/data/users/user-repository-impl';

import '@/data/di';

const repositories = {
  todoRepository: container.resolve(TodoRepositoryImpl),
  userRepository: container.resolve(UserRepositoryImpl),
};

export default {
  repositories,
};
