import { inject, singleton } from 'tsyringe';
import type { User } from '../../domain/users/models/user';
import type { UserRepository } from '../../domain/users/user-repository';

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
