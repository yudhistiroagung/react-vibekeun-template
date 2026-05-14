import type { Task } from '@/domain/tasks/models';
import type { TaskEntity } from '../models';

export const taskEntityToDomain = (entity: TaskEntity): Task => ({
  id: entity.id,
  profileId: entity.profileId,
  title: entity.title,
  type: entity.type,
  points: entity.points,
  frequency: entity.frequency,
  createdAt: entity.createdAt,
});

export const taskDomainToEntity = (domain: Task): TaskEntity => ({
  id: domain.id,
  profileId: domain.profileId,
  title: domain.title,
  type: domain.type,
  points: domain.points,
  frequency: domain.frequency,
  createdAt: domain.createdAt,
});
