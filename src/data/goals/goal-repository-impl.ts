import { inject, singleton } from 'tsyringe';
import type { GoalRepository } from '@/domain/goals/goal-repository';
import type { Goal } from '@/domain/goals/models/goal';
import type { GoalDataSource } from './datasources/goal-datasource';
import { GoalLocalDatasource } from './datasources/local/goal-local-datasource';
import { goalDomainToEntity, goalEntityToDomain } from './mapper/goal-mapper';

@singleton()
export class GoalRepositoryImpl implements GoalRepository {
  constructor(
    @inject(GoalLocalDatasource.TOKEN) private readonly local: GoalDataSource,
  ) {}

  async getAll(): Promise<Goal[]> {
    const entities = await this.local.getGoals();
    return entities.map(goalEntityToDomain);
  }

  async getByProfileId(profileId: number): Promise<Goal[]> {
    const entities = await this.local.getGoalsByProfileId(profileId);
    return entities.map(goalEntityToDomain);
  }

  async create(goal: Omit<Goal, 'id' | 'createdAt'>): Promise<Goal> {
    const now = Date.now();
    const entity = {
      ...goal,
      createdAt: now,
    };
    const id = await this.local.addGoal(entity);
    return goalEntityToDomain({ ...entity, id });
  }

  async bulkAdd(goals: Goal[]): Promise<void> {
    const entities = goals.map(goalDomainToEntity);
    await this.local.bulkAddGoals(entities);
  }

  async clear(): Promise<void> {
    await this.local.clearGoals();
  }
}
