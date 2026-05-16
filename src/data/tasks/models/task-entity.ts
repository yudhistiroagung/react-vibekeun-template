import { z } from 'zod';

export const TaskEntity = z.object({
  id: z.number().optional(),
  profileId: z.number(),
  goalId: z.number(),
  date: z.string(),
  status: z.enum(['completed', 'pending']),
  rating: z.number().optional(),
  createdAt: z.number(),
});

export type TaskEntity = z.infer<typeof TaskEntity>;
