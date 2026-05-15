import { container } from 'tsyringe';

import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';
import { ProfileRepositoryImpl } from '@/data/profiles/profile-repository-impl';

import '@/data/di';

const repositories = {
  todoRepository: container.resolve(TodoRepositoryImpl),
  profileRepository: container.resolve(ProfileRepositoryImpl),
};

export default {
  repositories,
};
