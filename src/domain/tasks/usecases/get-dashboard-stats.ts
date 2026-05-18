import { inject, singleton } from 'tsyringe';
import { TaskRepository } from '../task-repository';

export interface DashboardStats {
  completedToday: number;
  totalToday: number;
  currentStreak: number;
  completionRate: {
    completed: number;
    pending: number;
  };
  performanceTrend: {
    date: string;
    averageRating: number | null;
  }[];
}

@singleton()
export class GetDashboardStats {
  constructor(
    @inject(TaskRepository.TOKEN)
    private readonly taskRepository: TaskRepository,
  ) {}

  async execute(
    profileId: number,
    trendDays: number = 7,
  ): Promise<DashboardStats> {
    const tasks = await this.taskRepository.getByProfileId(profileId);

    // Sort tasks by date ascending to make streak and trend calculation easier
    const sortedTasks = [...tasks].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const today = new Date();
    // Use local YYYY-MM-DD
    const getLocalDateString = (d: Date) => {
      const year = d.getFullYear();
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const day = String(d.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const todayStr = getLocalDateString(today);

    const todayTasks = sortedTasks.filter((t) => t.date === todayStr);
    const completedToday = todayTasks.filter(
      (t) => t.status === 'completed',
    ).length;
    const totalToday = todayTasks.length;

    const completionRate = {
      completed: sortedTasks.filter((t) => t.status === 'completed').length,
      pending: sortedTasks.filter((t) => t.status === 'pending').length,
    };

    // Calculate current streak
    // Streak: consecutive days counting backwards from today (or yesterday) where at least 1 task was completed
    let currentStreak = 0;
    const checkDate = new Date(today);

    // First, check if today has any completed task
    const hasCompletedToday = completedToday > 0;
    if (hasCompletedToday) {
      currentStreak = 1;
      checkDate.setDate(checkDate.getDate() - 1);
    } else {
      // If today is not completed, maybe streak is still alive from yesterday
      checkDate.setDate(checkDate.getDate() - 1);
    }

    // Group tasks by date for faster lookup
    const tasksByDate = sortedTasks.reduce(
      (acc, task) => {
        if (!acc[task.date]) {
          acc[task.date] = [];
        }
        acc[task.date].push(task);
        return acc;
      },
      {} as Record<string, typeof sortedTasks>,
    );

    while (true) {
      const dateStr = getLocalDateString(checkDate);
      const dayTasks = tasksByDate[dateStr] || [];
      const hasCompleted = dayTasks.some((t) => t.status === 'completed');

      if (hasCompleted) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      } else {
        break;
      }
    }

    // Performance trend
    const performanceTrend: { date: string; averageRating: number | null }[] =
      [];
    const trendStartDate = new Date(today);
    trendStartDate.setDate(trendStartDate.getDate() - trendDays + 1);

    for (let i = 0; i < trendDays; i++) {
      const d = new Date(trendStartDate);
      d.setDate(d.getDate() + i);
      const dateStr = getLocalDateString(d);

      const dayTasks = tasksByDate[dateStr] || [];
      const completedTasksWithRating = dayTasks.filter(
        (t) => t.status === 'completed' && t.rating !== undefined,
      );

      let averageRating: number | null = null;
      if (completedTasksWithRating.length > 0) {
        const sum = completedTasksWithRating.reduce(
          (acc, t) => acc + (t.rating || 0),
          0,
        );
        averageRating = sum / completedTasksWithRating.length;
      }

      // format date as DD MMM for display
      const displayDate = d.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
      });

      performanceTrend.push({
        date: displayDate,
        averageRating,
      });
    }

    return {
      completedToday,
      totalToday,
      currentStreak,
      completionRate,
      performanceTrend,
    };
  }
}
