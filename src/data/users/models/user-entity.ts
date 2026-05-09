import { z } from 'zod';

export const UserEntity = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});

export type UserEntity = z.infer<typeof UserEntity>;
