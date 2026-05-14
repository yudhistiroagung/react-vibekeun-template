import { z } from 'zod';

export const ProfileEntity = z.object({
  id: z.number().optional(),
  name: z.string(),
  isDefault: z.boolean(),
  createdAt: z.number(),
});

export type ProfileEntity = z.infer<typeof ProfileEntity>;
