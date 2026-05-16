import type { Table } from 'dexie';
import type { TaskEntity } from '../../../models/task-entity';

export type TaskTable = Table<TaskEntity, number>;

export default {
  TOKEN: 'TaskLocalDb',
  TABLE_NAME: 'tasks',
} as const;
