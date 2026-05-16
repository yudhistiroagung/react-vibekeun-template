import { container } from 'tsyringe';
import { ProfileRepositoryImpl } from '@/data/profiles/profile-repository-impl';
import { SyncRepositoryImpl } from '@/data/sync/sync-repository-impl';
import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';

import '@/data/di';

const repositories = {
  todoRepository: container.resolve(TodoRepositoryImpl),
  profileRepository: container.resolve(ProfileRepositoryImpl),
  syncRepository: container.resolve(SyncRepositoryImpl),
};

export default {
  repositories,
};
