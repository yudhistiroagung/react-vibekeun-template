import { z } from 'zod';

export const Profile = z.object({
  id: z.number(),
  name: z.string().min(1, 'Name is required'),
  createdAt: z.number(),
});

export type Profile = z.infer<typeof Profile>;
