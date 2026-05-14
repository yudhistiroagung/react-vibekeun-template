import type { Table } from 'dexie';
import type { ProfileEntity } from '../../../models';

export type ProfileTable = Table<ProfileEntity, number>;
export default {
  TOKEN: 'ProfileLocalDBToken',
  TABLE_NAME: 'profiles',
};
