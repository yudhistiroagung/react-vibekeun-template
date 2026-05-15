import type { Table } from 'dexie';
import type { ProfileEntity } from '../../../models/profile-entity';

export type ProfileTable = Table<ProfileEntity, number>;

export default {
  TOKEN: 'ProfileLocalDBToken',
  TABLE_NAME: 'profiles',
};
