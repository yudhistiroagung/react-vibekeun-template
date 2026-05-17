import { useGetTodayTasks } from '@/presentation/hooks/use-get-today-tasks';
import { TaskCard } from './task-card';
import { Skeleton } from '@/presentation/components/ui/skeleton';

export function TaskList() {
  const { data: tasks, isLoading } = useGetTodayTasks();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-[140px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center py-12 bg-muted/20 rounded-xl border border-dashed">
        <h3 className="text-lg font-medium text-foreground">No tasks for today</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Create some goals to get daily tasks generated automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
