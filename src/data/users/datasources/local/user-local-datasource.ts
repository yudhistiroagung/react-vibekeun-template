import { inject, singleton } from 'tsyringe';

import type { UserEntity } from '../../models/user-entity';
import type { UserTable } from './db';
import UserLocalDbConfig from './db';

@singleton()
export class UserLocalDatasource {
  static readonly TOKEN = 'UserLocalDatasource';
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
