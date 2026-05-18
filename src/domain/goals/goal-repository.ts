import type { Goal } from './models/goal';

export interface GoalRepository {
  getAll(): Promise<Goal[]>;
  getByProfileId(profileId: number): Promise<Goal[]>;
  create(goal: Omit<Goal, 'id' | 'createdAt'>): Promise<Goal>;
  update(id: number, goal: Partial<Goal>): Promise<Goal>;
  delete(id: number): Promise<void>;
  bulkAdd(goals: Goal[]): Promise<void>;
  clear(): Promise<void>;
}

export namespace GoalRepository {
  export const TOKEN = 'GoalRepository';
}
