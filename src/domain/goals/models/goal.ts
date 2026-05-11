export interface Goal {
  id: string;
  title: string;
  goalType: 'one-time' | 'repetitive';
  scoringType: 'boolean' | 'rating' | 'numeric';
  ratingScale?: { min: number; max: number };
  numericUnit?: string | null;
  deadlineDate?: string | null;
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly';
    weekdays?: number[];
    daysOfMonth?: number[];
  };
  createdAt: number;
  updatedAt: number;
}
