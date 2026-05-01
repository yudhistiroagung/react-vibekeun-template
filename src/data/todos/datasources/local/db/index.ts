import type { Table } from 'dexie';

import type { Todo } from '@/domain/todos/models';

export type TodoTable = Table<Todo>;
export default {
  TOKEN: 'TodoLocalDBToken',
  TABLE_NAME: 'todos',
};
