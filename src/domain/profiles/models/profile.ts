import { z } from 'zod';

export const Profile = z.object({
  id: z.number().optional(),
  name: z.string(),
  isDefault: z.boolean(),
  createdAt: z.number(),
});

export type Profile = z.infer<typeof Profile>;
