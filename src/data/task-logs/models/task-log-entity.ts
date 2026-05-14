import { z } from 'zod';

export const TaskLogEntity = z.object({
  id: z.number().optional(),
  taskId: z.number(),
  profileId: z.number(),
  completedAt: z.number(),
  pointsEarned: z.number(),
});

export type TaskLogEntity = z.infer<typeof TaskLogEntity>;
