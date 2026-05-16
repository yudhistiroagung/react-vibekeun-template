import type { Task } from '@/domain/tasks/models/task';
import type { TaskEntity } from '../models/task-entity';

export const taskEntityToDomain = (entity: TaskEntity): Task => {
  if (entity.id === undefined) {
    throw new Error('Task entity is missing an ID');
  }

  return {
    id: entity.id,
    profileId: entity.profileId,
    goalId: entity.goalId,
    date: entity.date,
    status: entity.status,
    rating: entity.rating,
    createdAt: entity.createdAt,
  };
};

export const taskDomainToEntity = (domain: Task): TaskEntity => {
  return {
    id: domain.id,
    profileId: domain.profileId,
    goalId: domain.goalId,
    date: domain.date,
    status: domain.status,
    rating: domain.rating,
    createdAt: domain.createdAt,
  };
};
