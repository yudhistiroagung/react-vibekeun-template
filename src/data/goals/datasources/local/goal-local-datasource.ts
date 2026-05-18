import { inject, singleton } from 'tsyringe';

import type { GoalEntity } from '../../models/goal-entity';
import type { GoalDataSource } from '../goal-datasource';
import GoalLocalDb, { type GoalTable } from './db';

@singleton()
export class GoalLocalDatasource implements GoalDataSource {
  static readonly TOKEN = 'GoalLocalDatasource';

  constructor(@inject(GoalLocalDb.TOKEN) private readonly goals: GoalTable) {}

  async getGoals(): Promise<GoalEntity[]> {
    return this.goals.toArray();
  }

  async getGoalsByProfileId(profileId: number): Promise<GoalEntity[]> {
    return this.goals.where('profileId').equals(profileId).toArray();
  }

  async addGoal(goal: GoalEntity): Promise<number> {
    return this.goals.add(goal);
  }

  async updateGoal(id: number, goal: Partial<GoalEntity>): Promise<number> {
    return this.goals.update(id, goal);
  }

  async deleteGoal(id: number): Promise<void> {
    await this.goals.delete(id);
  }

  async bulkAddGoals(goals: GoalEntity[]): Promise<void> {
    await this.goals.bulkAdd(goals);
  }

  async clearGoals(): Promise<void> {
    await this.goals.clear();
  }
}
