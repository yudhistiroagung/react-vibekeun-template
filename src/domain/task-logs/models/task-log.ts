import { z } from 'zod';

export const TaskLog = z.object({
  id: z.number().optional(),
  taskId: z.number(),
  profileId: z.number(),
  completedAt: z.number(),
  pointsEarned: z.number(),
});

export type TaskLog = z.infer<typeof TaskLog>;
