import type { Table } from 'dexie';

import type { TodoEntity } from '../../../models';

export type TodoTable = Table<TodoEntity>;
export default {
  TOKEN: 'TodoLocalDBToken',
  TABLE_NAME: 'todos',
};
