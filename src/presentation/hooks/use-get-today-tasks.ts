import { useQuery } from '@tanstack/react-query';
import di from '@/di';
import type { Goal } from '@/domain/goals/models/goal';
import type { Task } from '@/domain/tasks/models/task';
import { useActiveProfile } from './use-active-profile';

export type TaskWithGoal = Task & { goal: Goal };

export const useGetTodayTasks = () => {
  const { activeProfileId } = useActiveProfile();

  return useQuery({
    queryKey: ['tasks', 'today', activeProfileId],
    queryFn: async (): Promise<TaskWithGoal[]> => {
      if (!activeProfileId) return [];

      const today = new Date();
      const dateStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      const getTasksUsecase = di.usecases.getTasksByProfileIdAndDateUsecase;
      const getGoalsUsecase = di.usecases.getGoalsByProfileIdUsecase;
      const createTaskUsecase = di.usecases.createTaskUsecase;

      let tasks = await getTasksUsecase.run({
        profileId: activeProfileId,
        date: dateStr,
      });
      const goals = await getGoalsUsecase.run({ profileId: activeProfileId });

      const newTasks = [];
      for (const goal of goals) {
        const existingTask = tasks.find((t) => t.goalId === goal.id);

        if (
          !existingTask &&
          (goal.frequency === 'Daily' || goal.frequency === 'One-time')
        ) {
          const task = await createTaskUsecase.run({
            task: {
              profileId: activeProfileId,
              goalId: goal.id,
              date: dateStr,
              status: 'pending',
            },
          });
          newTasks.push(task);
        }
      }

      if (newTasks.length > 0) {
        tasks = [...tasks, ...newTasks];
      }

      // Map tasks to their goals
      return tasks
        .map((task) => {
          const goal = goals.find((g) => g.id === task.goalId);
          return {
            ...task,
            goal: goal as Goal, // We assume the goal exists since the task belongs to it
          };
        })
        .filter((t) => t.goal !== undefined);
    },
    enabled: !!activeProfileId,
  });
};
