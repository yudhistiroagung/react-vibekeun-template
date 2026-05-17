import { useQuery } from '@tanstack/react-query';
import di from '@/di';
import { useActiveProfile } from './use-active-profile';
import type { Task } from '@/domain/tasks/models/task';
import type { Goal } from '@/domain/goals/models/goal';

export type TaskWithGoal = Task & { goal: Goal };

export const useGetTodayTasks = () => {
  const { activeProfileId } = useActiveProfile();

  return useQuery({
    queryKey: ['tasks', 'today', activeProfileId],
    queryFn: async (): Promise<TaskWithGoal[]> => {
      if (!activeProfileId) return [];

      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
      
      const taskRepo = di.repositories.taskRepository;
      const goalRepo = di.repositories.goalRepository;

      let tasks = await taskRepo.getByProfileIdAndDate(activeProfileId, dateStr);
      const goals = await goalRepo.getByProfileId(activeProfileId);

      // If no tasks exist for today, generate them based on goals
      if (tasks.length === 0) {
        const newTasks = [];
        for (const goal of goals) {
          // Simplification for MVP: generating for Daily and One-time
          if (goal.frequency === 'Daily' || goal.frequency === 'One-time') {
            const task = await taskRepo.create({
              profileId: activeProfileId,
              goalId: goal.id,
              date: dateStr,
              status: 'pending',
            });
            newTasks.push(task);
          }
        }
        
        tasks = newTasks;
      }

      // Map tasks to their goals
      return tasks.map(task => {
        const goal = goals.find(g => g.id === task.goalId);
        return {
          ...task,
          goal: goal as Goal // We assume the goal exists since the task belongs to it
        };
      }).filter(t => t.goal !== undefined);
    },
    enabled: !!activeProfileId,
  });
};
