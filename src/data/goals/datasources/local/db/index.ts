import type { Table } from 'dexie';
import type { GoalEntity } from '../../../models/goal-entity';

export type GoalTable = Table<GoalEntity, number>;

export default {
  TOKEN: 'GoalLocalDb',
  TABLE_NAME: 'goals',
} as const;
