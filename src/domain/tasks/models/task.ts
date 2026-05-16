import { z } from 'zod';

export const Task = z.object({
  id: z.number(),
  profileId: z.number(),
  goalId: z.number(),
  date: z.string(),
  status: z.enum(['completed', 'pending']),
  rating: z.number().optional(),
  createdAt: z.number(),
});

export type Task = z.infer<typeof Task>;
