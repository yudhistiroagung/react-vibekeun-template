import { inject, singleton } from 'tsyringe';
import { AppDatabase } from '@/cores/dexie/db-dexie';
import type { GoalRepository } from '@/domain/goals/goal-repository';
import type { Goal } from '@/domain/goals/models/goal';
import { goalDomainToEntity, goalEntityToDomain } from './mapper/goal-mapper';

@singleton()
export class GoalRepositoryImpl implements GoalRepository {
  constructor(@inject(AppDatabase) private readonly db: AppDatabase) {}

  async getAll(): Promise<Goal[]> {
    const goals = await this.db.goals.toArray();
    return goals.map(goalEntityToDomain);
  }

  async bulkAdd(goals: Goal[]): Promise<void> {
    const entities = goals.map(goalDomainToEntity);
    await this.db.goals.bulkAdd(entities);
  }

  async clear(): Promise<void> {
    await this.db.goals.clear();
  }
}
