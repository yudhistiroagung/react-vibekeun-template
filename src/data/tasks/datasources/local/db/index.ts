import type { Table } from 'dexie';
import type { TaskEntity } from '../../../models';

export type TaskTable = Table<TaskEntity, number>;
export default {
  TOKEN: 'TaskLocalDBToken',
  TABLE_NAME: 'tasks',
};
