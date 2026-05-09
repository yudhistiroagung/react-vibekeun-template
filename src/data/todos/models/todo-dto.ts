import { z } from 'zod';

const TodoDto = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  status: z.boolean(),
  description: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
});

export type TodoDto = z.infer<typeof TodoDto>;
