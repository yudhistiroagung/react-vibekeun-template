import { z } from 'zod';

export const Goal = z.object({
  id: z.number(),
  profileId: z.number(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.number(),
});

export type Goal = z.infer<typeof Goal>;
