import { type Table } from 'dexie';

import type { Todo } from '@/domain/todos/models';

export type TodoTable = Table<Todo>;
export const TodoLocalDB = 'TodoLocalDB';
export const TodoTableName = 'todos';
