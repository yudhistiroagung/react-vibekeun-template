#!/bin/bash
mkdir -p src/domain/users/models src/data/users/models src/data/users/datasources/local/db src/data/users/mapper

cat << 'INNER_EOF' > src/domain/users/models/user.ts
import { z } from 'zod';
export const User = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});
export type User = z.infer<typeof User>;
INNER_EOF

cat << 'INNER_EOF' > src/domain/users/user-repository.ts
import type { User } from './models/user';
export interface UserRepository {
  createUser(user: Omit<User, 'id'>): Promise<User>;
  getUserByUsername(username: string): Promise<User | undefined>;
}
INNER_EOF

cat << 'INNER_EOF' > src/data/users/models/user-entity.ts
import { z } from 'zod';
export const UserEntity = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
});
export type UserEntity = z.infer<typeof UserEntity>;
INNER_EOF

cat << 'INNER_EOF' > src/data/users/datasources/local/db/index.ts
import type { Table } from 'dexie';
import type { UserEntity } from '../../models/user-entity';
export type UserTable = Table<UserEntity>;
export default {
  TOKEN: 'UserLocalDBToken',
  TABLE_NAME: 'users',
};
INNER_EOF

cat << 'INNER_EOF' > src/data/users/datasources/local/user-local-datasource.ts
import { inject, singleton } from 'tsyringe';
import type { UserTable } from './db';
import type { UserEntity } from '../models/user-entity';
import UserLocalDbConfig from './db';

@singleton()
export class UserLocalDatasource {
  constructor(
    @inject(UserLocalDbConfig.TOKEN)
    private readonly table: UserTable,
  ) {}

  async create(user: UserEntity): Promise<void> {
    await this.table.add(user);
  }

  async getByUsername(username: string): Promise<UserEntity | undefined> {
    return this.table.where('username').equals(username).first();
  }
}
INNER_EOF

cat << 'INNER_EOF' > src/data/users/mapper/user-mapper.ts
import type { User } from '../../../domain/users/models/user';
import type { UserEntity } from '../models/user-entity';

export class UserMapper {
  static toDomain(entity: UserEntity): User {
    return {
      id: entity.id,
      username: entity.username,
      password: entity.password,
    };
  }
  static toEntity(domain: User): UserEntity {
    return {
      id: domain.id,
      username: domain.username,
      password: domain.password,
    };
  }
}
INNER_EOF

cat << 'INNER_EOF' > src/data/users/user-repository-impl.ts
import { inject, singleton } from 'tsyringe';
import type { UserRepository } from '../../domain/users/user-repository';
import type { User } from '../../domain/users/models/user';
import { UserLocalDatasource } from './datasources/local/user-local-datasource';
import { UserMapper } from './mapper/user-mapper';

@singleton()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @inject(UserLocalDatasource)
    private readonly localDatasource: UserLocalDatasource,
  ) {}

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    const id = crypto.randomUUID();
    const newUser = { ...user, id };
    const entity = UserMapper.toEntity(newUser);
    await this.localDatasource.create(entity);
    return newUser;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const entity = await this.localDatasource.getByUsername(username);
    return entity ? UserMapper.toDomain(entity) : undefined;
  }
}
INNER_EOF
