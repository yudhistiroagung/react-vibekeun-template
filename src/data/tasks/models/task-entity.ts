import { z } from 'zod';

export const TaskEntity = z.object({
  id: z.number().optional(),
  profileId: z.number(),
  title: z.string(),
  type: z.enum(['one-time', 'recurring']),
  points: z.number(),
  frequency: z.enum(['daily', 'weekly']).optional(),
  createdAt: z.number(),
});

export type TaskEntity = z.infer<typeof TaskEntity>;
