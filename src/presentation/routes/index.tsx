import { createFileRoute } from '@tanstack/react-router';
import { TaskList } from '@/presentation/components/tasks/task-list';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="border-b pb-4">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Today's Tasks
        </h1>
        <p className="text-muted-foreground mt-2">
          Rate your execution for today's goals.
        </p>
      </div>

      <div className="max-w-2xl">
        <TaskList />
      </div>
    </div>
  );
}
