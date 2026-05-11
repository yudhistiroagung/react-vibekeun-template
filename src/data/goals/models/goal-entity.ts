export interface GoalEntity {
  id: string;
  title: string;
  goalType: 'one-time' | 'repetitive';
  scoringType: 'boolean' | 'rating' | 'numeric';
  ratingScale?: { min: number; max: number };
  numericUnit?: string | null;
  deadlineDate?: string | null; // Format YYYY-MM-DD
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    weekdays?: number[]; // 0-6
    daysOfMonth?: number[]; // 1-31
  };
  createdAt: number;
  updatedAt: number;
}
