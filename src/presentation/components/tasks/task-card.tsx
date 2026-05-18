import { CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/presentation/components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/presentation/components/ui/card';
import { Slider } from '@/presentation/components/ui/slider';
import type { TaskWithGoal } from '@/presentation/hooks/use-get-today-tasks';
import { useRateTask } from '@/presentation/hooks/use-rate-task';
import { useToggleTaskStatus } from '@/presentation/hooks/use-toggle-task-status';

interface TaskCardProps {
  task: TaskWithGoal;
}

export function TaskCard({ task }: TaskCardProps) {
  const { mutate: rateTask } = useRateTask();
  const { mutate: toggleStatus } = useToggleTaskStatus();
  const [rating, setRating] = useState<number>(task.rating || 0);
  const isCompleted = task.status === 'completed';

  const handleToggleComplete = () => {
    const newStatus = isCompleted ? 'pending' : 'completed';
    const newRating = rating || 3; // Default to 3 if no rating when completing

    if (newStatus === 'completed') {
      setRating(newRating);
    }

    toggleStatus({
      taskId: task.id,
      status: newStatus,
      rating: newStatus === 'completed' ? newRating : undefined,
    });
  };

  const handleRatingChange = (value: number[]) => {
    const newRating = value[0];
    setRating(newRating);
    rateTask({ taskId: task.id, rating: newRating });
  };

  return (
    <Card
      className={`transition-colors ${isCompleted ? 'bg-muted/50 border-primary/20' : ''}`}
    >
      <CardHeader
        className="flex flex-row items-center justify-between pb-2 space-y-0 cursor-pointer hover:bg-muted/30 transition-colors rounded-t-xl"
        onClick={handleToggleComplete}
      >
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <CheckCircle2 className="h-5 w-5 text-primary" />
          ) : (
            <Circle className="h-5 w-5 text-muted-foreground" />
          )}
          <CardTitle className="text-base font-medium">
            {task.goal.title}
          </CardTitle>
        </div>
        <Badge variant={isCompleted ? 'default' : 'secondary'}>
          {isCompleted ? `Rated: ${rating}/5` : 'Pending'}
        </Badge>
      </CardHeader>
      <CardContent>
        {task.goal.description && (
          <p className="text-sm text-muted-foreground mb-4">
            {task.goal.description}
          </p>
        )}

        <div className="space-y-3 mt-4">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Poor (1)</span>
            <span>Average (3)</span>
            <span>Excellent (5)</span>
          </div>
          <Slider
            defaultValue={[rating || 3]}
            max={5}
            min={1}
            step={1}
            value={[rating || 3]}
            onValueCommit={handleRatingChange}
            onValueChange={(val) => setRating(val[0])}
            className="py-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}
