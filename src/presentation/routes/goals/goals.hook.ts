import { useState } from 'react';
import { toast } from 'sonner';
import type { GoalFrequency } from '@/domain/goals/models/goal';
import { useCreateGoal } from '@/presentation/hooks/use-create-goal';
import { useGetGoals } from '@/presentation/hooks/use-get-goals';

export const useGoals = () => {
  const { data: goals = [], isLoading } = useGetGoals();
  const createGoalMutation = useCreateGoal();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<GoalFrequency>('Daily');

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error('Title is required');
      return;
    }

    try {
      await createGoalMutation.mutateAsync({
        title,
        description,
        frequency,
      });
      toast.success('Goal created successfully!');
      setTitle('');
      setDescription('');
      setFrequency('Daily');
      setIsFormOpen(false);
    } catch (_error) {
      toast.error('Failed to create goal');
    }
  };

  return {
    goals,
    isLoading,
    isFormOpen,
    setIsFormOpen,
    form: {
      title,
      setTitle,
      description,
      setDescription,
      frequency,
      setFrequency,
      handleSubmit,
      isSubmitting: createGoalMutation.isPending,
    },
  };
};
