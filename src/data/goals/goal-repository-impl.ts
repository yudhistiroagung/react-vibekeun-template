import { inject, singleton } from 'tsyringe';
import { GoalRepository } from '@/domain/goals/goal-repository';
import type { Goal } from '@/domain/goals/models/goal';
import type { GoalDataSource } from './datasources/goal-datasource';
import { GoalLocalDatasource } from './datasources/local/goal-local-datasource';
import { goalDomainToEntity, goalEntityToDomain } from './mapper/goal-mapper';

@singleton()
export class GoalRepositoryImpl implements GoalRepository {
  static readonly TOKEN = GoalRepository.TOKEN;
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

  async update(id: number, goal: Partial<Goal>): Promise<Goal> {
    await this.local.updateGoal(id, goal);
    const updatedEntities = await this.local.getGoals();
    const updatedEntity = updatedEntities.find(g => g.id === id);
    if (!updatedEntity) throw new Error(`Goal ${id} not found after update`);
    return goalEntityToDomain(updatedEntity);
  }

  async delete(id: number): Promise<void> {
    await this.local.deleteGoal(id);
  }

  async bulkAdd(goals: Goal[]): Promise<void> {
    const entities = goals.map(goalDomainToEntity);
    await this.local.bulkAddGoals(entities);
  }

  async clear(): Promise<void> {
    await this.local.clearGoals();
  }
}
