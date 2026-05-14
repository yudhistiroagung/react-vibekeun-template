import type { TaskLog } from '@/domain/task-logs/models';
import type { TaskLogEntity } from '../models';

export const taskLogEntityToDomain = (entity: TaskLogEntity): TaskLog => ({
  id: entity.id,
  taskId: entity.taskId,
  profileId: entity.profileId,
  completedAt: entity.completedAt,
  pointsEarned: entity.pointsEarned,
});

export const taskLogDomainToEntity = (domain: TaskLog): TaskLogEntity => ({
  id: domain.id,
  taskId: domain.taskId,
  profileId: domain.profileId,
  completedAt: domain.completedAt,
  pointsEarned: domain.pointsEarned,
});
