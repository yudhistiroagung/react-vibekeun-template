import type { Table } from 'dexie';
import type { TaskLogEntity } from '../../../models';

export type TaskLogTable = Table<TaskLogEntity, number>;
export default {
  TOKEN: 'TaskLogLocalDBToken',
  TABLE_NAME: 'taskLogs',
};
