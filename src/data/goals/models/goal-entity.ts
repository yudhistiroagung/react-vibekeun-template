import { z } from 'zod';

export const GoalEntity = z.object({
  id: z.number().optional(),
  profileId: z.number(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.number(),
});

export type GoalEntity = z.infer<typeof GoalEntity>;
