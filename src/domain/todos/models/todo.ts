import { z } from 'zod';

export const Todo = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  status: z.boolean(),
  description: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type Todo = z.infer<typeof Todo>;
