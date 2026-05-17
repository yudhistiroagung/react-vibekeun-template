import { beforeEach, describe, expect, it, vi } from 'vitest';
import { TaskRepositoryImpl } from './task-repository-impl';
import type { Task } from '@/domain/tasks/models/task';
import type { TaskEntity } from './models/task-entity';

describe('TaskRepositoryImpl', () => {
  let mockLocalDatasource: any;
  let repository: TaskRepositoryImpl;

  beforeEach(() => {
    mockLocalDatasource = {
      getTasks: vi.fn(),
      bulkAddTasks: vi.fn(),
      clearTasks: vi.fn(),
    };
    repository = new TaskRepositoryImpl(mockLocalDatasource);
  });

  it('should get all tasks and map to domain models', async () => {
    const mockEntities: TaskEntity[] = [
      { id: 1, profileId: 1, goalId: 1, date: '2026-05-16', status: 'pending', rating: 0, createdAt: 123456789 },
    ];
    mockLocalDatasource.getTasks.mockResolvedValue(mockEntities);

    const result = await repository.getAll();

    expect(result).toEqual([
      { id: 1, profileId: 1, goalId: 1, date: '2026-05-16', status: 'pending', rating: 0, createdAt: 123456789 },
    ]);
    expect(mockLocalDatasource.getTasks).toHaveBeenCalledTimes(1);
  });

  it('should bulk add tasks by mapping domain to entity models', async () => {
    const domainTasks: Task[] = [
      { id: 1, profileId: 1, goalId: 1, date: '2026-05-16', status: 'pending', rating: 0, createdAt: 123456789 },
    ];
    mockLocalDatasource.bulkAddTasks.mockResolvedValue(undefined);

    await repository.bulkAdd(domainTasks);

    expect(mockLocalDatasource.bulkAddTasks).toHaveBeenCalledWith([
      { id: 1, profileId: 1, goalId: 1, date: '2026-05-16', status: 'pending', rating: 0, createdAt: 123456789 },
    ]);
    expect(mockLocalDatasource.bulkAddTasks).toHaveBeenCalledTimes(1);
  });

  it('should clear tasks', async () => {
    mockLocalDatasource.clearTasks.mockResolvedValue(undefined);

    await repository.clear();

    expect(mockLocalDatasource.clearTasks).toHaveBeenCalledTimes(1);
  });
});
