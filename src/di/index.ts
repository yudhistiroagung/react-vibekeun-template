import { container } from 'tsyringe';

import { ProfileRepositoryImpl } from '@/data/profiles/profile-repository-impl';
import { TaskLogRepositoryImpl } from '@/data/task-logs/task-log-repository-impl';
import { TaskRepositoryImpl } from '@/data/tasks/task-repository-impl';

import '@/data/di';

const repositories = {
  profileRepository: container.resolve(ProfileRepositoryImpl),
  taskRepository: container.resolve(TaskRepositoryImpl),
  taskLogRepository: container.resolve(TaskLogRepositoryImpl),
};

export default {
  repositories,
};
