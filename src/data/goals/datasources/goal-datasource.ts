import type { GoalEntity } from '../models/goal-entity';

export interface GoalDataSource {
  getGoals(): Promise<GoalEntity[]>;
  getGoalsByProfileId(profileId: number): Promise<GoalEntity[]>;
  addGoal(goal: GoalEntity): Promise<number>;
  bulkAddGoals(goals: GoalEntity[]): Promise<void>;
  clearGoals(): Promise<void>;
}
