import type { Table } from 'dexie';
import type { UserEntity } from '../../../models/user-entity';

export type UserTable = Table<UserEntity>;

export default {
  TOKEN: 'UserLocalDBToken',
  TABLE_NAME: 'users',
};
