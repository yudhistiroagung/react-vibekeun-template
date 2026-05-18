import { describe, it, expect, vi } from 'vitest';
import { GetTasksByProfileIdAndDateUsecase } from './get-tasks-by-profile-id-and-date';
import { TaskRepository } from '../task-repository';

describe('GetTasksByProfileIdAndDateUsecase', () => {
  it('should execute successfully', async () => {
    const mockTaskRepository = {
    } as unknown as import('vitest').Mocked<TaskRepository>;

    mockTaskRepository.getByProfileIdAndDate = vi.fn().mockResolvedValue('mock-result' as any);

    const usecase = new GetTasksByProfileIdAndDateUsecase(mockTaskRepository);
    const result = await usecase.run({"profileId":1,"date":"2026-05-17"});

    expect(mockTaskRepository.getByProfileIdAndDate).toHaveBeenCalledTimes(1);
    expect(result).toBeDefined();
  });
});
