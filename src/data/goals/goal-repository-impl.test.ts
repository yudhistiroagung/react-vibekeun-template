import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { GoalRepositoryImpl } from './goal-repository-impl';
import type { Goal } from '@/domain/goals/models/goal';
import type { GoalEntity } from './models/goal-entity';

describe('GoalRepositoryImpl', () => {
  let mockLocalDatasource: any;
  let repository: GoalRepositoryImpl;

  beforeEach(() => {
    mockLocalDatasource = {
      getGoals: vi.fn(),
      getGoalsByProfileId: vi.fn(),
      addGoal: vi.fn(),
      bulkAddGoals: vi.fn(),
      clearGoals: vi.fn(),
    };
    repository = new GoalRepositoryImpl(mockLocalDatasource);
    
    // Mock Date.now() for predictable tests
    vi.useFakeTimers();
    vi.setSystemTime(new Date(123456789));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should get all goals and map to domain models', async () => {
    const mockEntities: GoalEntity[] = [
      { id: 1, title: 'Goal 1', description: 'Desc', frequency: 'daily', profileId: 1, createdAt: 123 },
    ];
    mockLocalDatasource.getGoals.mockResolvedValue(mockEntities);

    const result = await repository.getAll();

    expect(result).toEqual([
      { id: 1, title: 'Goal 1', description: 'Desc', frequency: 'daily', profileId: 1, createdAt: 123 },
    ]);
    expect(mockLocalDatasource.getGoals).toHaveBeenCalledTimes(1);
  });

  it('should get goals by profile id', async () => {
    const mockEntities: GoalEntity[] = [
      { id: 1, title: 'Goal 1', description: 'Desc', frequency: 'daily', profileId: 1, createdAt: 123 },
    ];
    mockLocalDatasource.getGoalsByProfileId.mockResolvedValue(mockEntities);

    const result = await repository.getByProfileId(1);

    expect(result).toEqual([
      { id: 1, title: 'Goal 1', description: 'Desc', frequency: 'daily', profileId: 1, createdAt: 123 },
    ]);
    expect(mockLocalDatasource.getGoalsByProfileId).toHaveBeenCalledWith(1);
  });

  it('should create a goal', async () => {
    const newGoal: Omit<Goal, 'id' | 'createdAt'> = {
      title: 'Goal 1',
      description: 'Desc',
      frequency: 'daily',
      profileId: 1,
    };
    
    mockLocalDatasource.addGoal.mockResolvedValue(1);

    const result = await repository.create(newGoal);

    expect(mockLocalDatasource.addGoal).toHaveBeenCalledWith({
      ...newGoal,
      createdAt: 123456789,
    });
    expect(result).toEqual({
      ...newGoal,
      id: 1,
      createdAt: 123456789,
    });
  });

  it('should bulk add goals', async () => {
    const mockGoals: Goal[] = [
      { id: 1, title: 'Goal 1', description: 'Desc', frequency: 'daily', profileId: 1, createdAt: 123 },
    ];
    mockLocalDatasource.bulkAddGoals.mockResolvedValue(undefined);

    await repository.bulkAdd(mockGoals);

    expect(mockLocalDatasource.bulkAddGoals).toHaveBeenCalledWith([
      { id: 1, title: 'Goal 1', description: 'Desc', frequency: 'daily', profileId: 1, createdAt: 123 },
    ]);
  });

  it('should clear goals', async () => {
    mockLocalDatasource.clearGoals.mockResolvedValue(undefined);

    await repository.clear();

    expect(mockLocalDatasource.clearGoals).toHaveBeenCalledTimes(1);
  });
});
