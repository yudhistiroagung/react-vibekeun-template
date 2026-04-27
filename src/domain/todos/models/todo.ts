import { z } from 'zod';

export const Todo = z.object({
  id: z.string(),
  name: z.string(),
  status: z.boolean(),
  description: z.string(),
});

export type Todo = z.infer<typeof Todo>;
