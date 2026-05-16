import { z } from 'zod';

export const GoalFrequency = z.enum(['Daily', 'Weekly', 'Monthly', 'One-time']);
export type GoalFrequency = z.infer<typeof GoalFrequency>;

export const Goal = z.object({
  id: z.number(),
  profileId: z.number(),
  title: z.string(),
  description: z.string().optional(),
  frequency: GoalFrequency,
  createdAt: z.number(),
});

export type Goal = z.infer<typeof Goal>;
