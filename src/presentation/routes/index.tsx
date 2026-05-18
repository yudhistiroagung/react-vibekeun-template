import { createFileRoute } from '@tanstack/react-router';
import { TaskList } from '@/presentation/components/tasks/task-list';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <TaskList />
    </>
  );
}
