import type { Goal } from './models/goal';

export interface GoalRepository {
  getAll(): Promise<Goal[]>;
  bulkAdd(goals: Goal[]): Promise<void>;
  clear(): Promise<void>;
}
