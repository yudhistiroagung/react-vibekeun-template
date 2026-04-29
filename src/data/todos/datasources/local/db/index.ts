import { container } from 'tsyringe';
import { type Table } from 'dexie';

import { AppDatabase } from '@/cores/database/db-dexie';
import type { Todo } from '@/domain/todos/models';

export const TodoLocalDB = 'TodoLocalDB';

export type TodoTable = Table<Todo>;

const TodoTableName = 'todos';

container.register(TodoLocalDB, {
  useFactory: (c) => {
    const i = c.resolve(AppDatabase).table(TodoTableName);
    console.log('INIAINIA', i);
    return i;
  },
});
