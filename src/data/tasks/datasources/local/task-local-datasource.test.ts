import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TaskEntity } from '../../models/task-entity';
import { TaskLocalDatasource } from './task-local-datasource';

describe('TaskLocalDatasource', () => {
  let mockTable: any;
  let datasource: TaskLocalDatasource;

  beforeEach(() => {
    mockTable = {
      toArray: vi.fn(),
      bulkAdd: vi.fn(),
      clear: vi.fn(),
    };
    datasource = new TaskLocalDatasource(mockTable);
  });

  it('should return all tasks', async () => {
    const mockTasks: TaskEntity[] = [
      {
        id: 1,
        profileId: 1,
        goalId: 1,
        date: '2026-05-16',
        status: 'pending',
        rating: 0,
        createdAt: 123456789,
      },
    ];
    mockTable.toArray.mockResolvedValue(mockTasks);

    const result = await datasource.getTasks();

    expect(result).toEqual(mockTasks);
    expect(mockTable.toArray).toHaveBeenCalledTimes(1);
  });

  it('should bulk add tasks', async () => {
    const mockTasks: TaskEntity[] = [
      {
        id: 1,
        profileId: 1,
        goalId: 1,
        date: '2026-05-16',
        status: 'pending',
        rating: 0,
        createdAt: 123456789,
      },
    ];
    mockTable.bulkAdd.mockResolvedValue(undefined);

    await datasource.bulkAddTasks(mockTasks);

    expect(mockTable.bulkAdd).toHaveBeenCalledWith(mockTasks);
    expect(mockTable.bulkAdd).toHaveBeenCalledTimes(1);
  });

  it('should clear tasks', async () => {
    mockTable.clear.mockResolvedValue(undefined);

    await datasource.clearTasks();

    expect(mockTable.clear).toHaveBeenCalledTimes(1);
  });
});
