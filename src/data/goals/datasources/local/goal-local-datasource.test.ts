import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { GoalEntity } from '../../models/goal-entity';
import { GoalLocalDatasource } from './goal-local-datasource';

describe('GoalLocalDatasource', () => {
  let mockTable: any;
  let datasource: GoalLocalDatasource;

  beforeEach(() => {
    mockTable = {
      toArray: vi.fn(),
      where: vi.fn(),
      add: vi.fn(),
      bulkAdd: vi.fn(),
      clear: vi.fn(),
    };
    datasource = new GoalLocalDatasource(mockTable);
  });

  it('should get all goals', async () => {
    const mockGoals: GoalEntity[] = [
      {
        id: 1,
        title: 'Goal 1',
        description: 'Desc',
        frequency: 'daily',
        profileId: 1,
        createdAt: 123,
      },
    ];
    mockTable.toArray.mockResolvedValue(mockGoals);

    const result = await datasource.getGoals();

    expect(result).toEqual(mockGoals);
    expect(mockTable.toArray).toHaveBeenCalledTimes(1);
  });

  it('should get goals by profile id', async () => {
    const mockGoals: GoalEntity[] = [
      {
        id: 1,
        title: 'Goal 1',
        description: 'Desc',
        frequency: 'daily',
        profileId: 1,
        createdAt: 123,
      },
    ];
    const mockEquals = vi.fn().mockReturnValue({
      toArray: vi.fn().mockResolvedValue(mockGoals),
    });
    mockTable.where.mockReturnValue({
      equals: mockEquals,
    });

    const result = await datasource.getGoalsByProfileId(1);

    expect(result).toEqual(mockGoals);
    expect(mockTable.where).toHaveBeenCalledWith('profileId');
    expect(mockEquals).toHaveBeenCalledWith(1);
  });

  it('should add a goal', async () => {
    const mockGoal: GoalEntity = {
      title: 'Goal 1',
      description: 'Desc',
      frequency: 'daily',
      profileId: 1,
      createdAt: 123,
    };
    mockTable.add.mockResolvedValue(1);

    const result = await datasource.addGoal(mockGoal);

    expect(result).toBe(1);
    expect(mockTable.add).toHaveBeenCalledWith(mockGoal);
  });

  it('should bulk add goals', async () => {
    const mockGoals: GoalEntity[] = [
      {
        id: 1,
        title: 'Goal 1',
        description: 'Desc',
        frequency: 'daily',
        profileId: 1,
        createdAt: 123,
      },
    ];
    mockTable.bulkAdd.mockResolvedValue(undefined);

    await datasource.bulkAddGoals(mockGoals);

    expect(mockTable.bulkAdd).toHaveBeenCalledWith(mockGoals);
  });

  it('should clear goals', async () => {
    mockTable.clear.mockResolvedValue(undefined);

    await datasource.clearGoals();

    expect(mockTable.clear).toHaveBeenCalledTimes(1);
  });
});
