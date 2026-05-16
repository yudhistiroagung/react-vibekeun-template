import { container } from 'tsyringe';
import { GoalRepositoryImpl } from '@/data/goals/goal-repository-impl';
import { ProfileRepositoryImpl } from '@/data/profiles/profile-repository-impl';
import { TaskRepositoryImpl } from '@/data/tasks/task-repository-impl';
import { TodoRepositoryImpl } from '@/data/todos/todo-repository-impl';

import '@/data/di';

const repositories = {
  todoRepository: container.resolve(TodoRepositoryImpl),
  profileRepository: container.resolve(ProfileRepositoryImpl),
  goalRepository: container.resolve(GoalRepositoryImpl),
  taskRepository: container.resolve(TaskRepositoryImpl),
};

export default {
  repositories,
};
