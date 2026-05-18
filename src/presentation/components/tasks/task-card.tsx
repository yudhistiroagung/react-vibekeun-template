import { useState } from 'react';
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
    const newRating = rating || 3;

    if (newStatus === 'completed') {
      setRating(newRating);
    }

    toggleStatus({
      taskId: task.id,
      status: newStatus,
      rating: newStatus === 'completed' ? newRating : undefined,
    });
  };

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newRating = parseInt(e.target.value, 10);
    setRating(newRating);
    rateTask({ taskId: task.id, rating: newRating });
  };

  if (isCompleted) {
    return (
      <div className="md:col-span-12 bg-surface-container-lowest border-strict p-container-padding flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={handleToggleComplete}>
              <div className="w-6 h-6 border border-primary flex items-center justify-center bg-primary">
                <span className="material-symbols-outlined text-on-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 0, 'wght' 700" }}>check</span>
              </div>
              <h3 className="font-headline-md text-headline-md line-through text-secondary">{task.goal.title}</h3>
            </div>
            <span className="font-label-caps text-label-caps bg-primary text-on-primary px-2 py-1">DONE</span>
          </div>
          {task.goal.description && (
            <p className="font-body-sm text-body-sm text-secondary mb-8 max-w-xl">{task.goal.description}</p>
          )}
        </div>
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="font-label-caps text-label-caps">PERFORMANCE RATING</label>
            <span className="font-stats-mono text-stats-mono font-bold">{rating}/5</span>
          </div>
          <div className="relative h-4 flex items-center">
            <div className="absolute w-full h-[1px] bg-outline-variant"></div>
            <div className="absolute h-[4px] bg-primary" style={{ width: `${(rating / 5) * 100}%` }}></div>
            <div className="absolute w-3 h-3 bg-primary -ml-1.5" style={{ left: `${(rating / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="md:col-span-12 bg-surface-container-lowest border-strict p-container-padding flex flex-col justify-between">
      <div className="mb-4">
        <div className="flex items-center gap-3 mb-4 cursor-pointer" onClick={handleToggleComplete}>
          <div className="w-6 h-6 border border-primary"></div>
          <h3 className="font-headline-md text-headline-md text-primary">{task.goal.title}</h3>
        </div>
        {task.goal.description && (
          <p className="font-body-sm text-body-sm text-on-surface mb-8 max-w-xl">{task.goal.description}</p>
        )}
      </div>
      <div className="mt-auto">
        <div className="flex justify-between items-center mb-4">
          <label className="font-label-caps text-label-caps">LIVE PERFORMANCE</label>
          <span className="font-stats-mono text-stats-mono">{rating > 0 ? rating : '--'}</span>
        </div>
        <input 
          className="mb-2" 
          max="5" 
          min="1" 
          type="range" 
          value={rating || 1} 
          onChange={handleRatingChange}
        />
        <div className="flex justify-between font-label-caps text-[10px] text-secondary">
          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
        </div>
      </div>
    </div>
  );
}
