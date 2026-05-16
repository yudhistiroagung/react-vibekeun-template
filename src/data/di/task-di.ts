import { container } from 'tsyringe';
import { AppDatabase } from '@/cores/dexie/db-dexie';

import TaskLocalDb from '../tasks/datasources/local/db';
import { TaskLocalDatasource } from '../tasks/datasources/local/task-local-datasource';

// Register Dexie table
container.register(
  ...AppDatabase.provideTable(TaskLocalDb.TOKEN, TaskLocalDb.TABLE_NAME),
);

// Register Datasource
container.register(TaskLocalDatasource.TOKEN, TaskLocalDatasource);
