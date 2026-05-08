import { z } from 'zod';

const TodoDto = z.object({
  id: z.string(),
  name: z.string(),
  status: z.boolean(),
  description: z.string(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type TodoDto = z.infer<typeof TodoDto>;
