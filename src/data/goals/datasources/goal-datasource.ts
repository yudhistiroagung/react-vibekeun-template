import type { GoalEntity } from '../models/goal-entity';

export interface GoalDataSource {
  getGoals(): Promise<GoalEntity[]>;
  getGoalsByProfileId(profileId: number): Promise<GoalEntity[]>;
  addGoal(goal: GoalEntity): Promise<number>;
  updateGoal(id: number, goal: Partial<GoalEntity>): Promise<number>;
  deleteGoal(id: number): Promise<void>;
  bulkAddGoals(goals: GoalEntity[]): Promise<void>;
  clearGoals(): Promise<void>;
}
