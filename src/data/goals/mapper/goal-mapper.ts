import type { Goal } from '@/domain/goals/models/goal';
import type { GoalEntity } from '../models/goal-entity';

export const goalEntityToDomain = (entity: GoalEntity): Goal => {
  if (entity.id === undefined) {
    throw new Error('Goal entity is missing an ID');
  }

  return {
    id: entity.id,
    profileId: entity.profileId,
    title: entity.title,
    description: entity.description,
    createdAt: entity.createdAt,
  };
};

export const goalDomainToEntity = (domain: Goal): GoalEntity => {
  return {
    id: domain.id,
    profileId: domain.profileId,
    title: domain.title,
    description: domain.description,
    createdAt: domain.createdAt,
  };
};
