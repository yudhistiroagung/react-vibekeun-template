import { Skeleton } from '@/presentation/components/ui/skeleton';
import { useGetTodayTasks } from '@/presentation/hooks/use-get-today-tasks';
import { TaskCard } from './task-card';

export function TaskList() {
  const { data: tasks, isLoading } = useGetTodayTasks();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-element-gap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="md:col-span-12">
            <Skeleton className="h-[140px] w-full rounded-none" />
          </div>
        ))}
      </div>
    );
  }

  if (!tasks || tasks.length === 0) {
    return (
      <div className="md:col-span-12 border border-dashed border-outline-variant p-gutter flex items-center justify-center min-h-[140px]">
        <span className="font-label-caps text-secondary">NO ACTIVE TASKS +</span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-element-gap w-full">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
