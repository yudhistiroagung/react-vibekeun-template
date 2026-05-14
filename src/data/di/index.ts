import { container } from 'tsyringe';

import { AppDatabase } from '@/cores/dexie/db-dexie';
import ProfileLocalDb from '../profiles/datasources/local/db';
import { ProfileLocalDatasource } from '../profiles/datasources/local/profile-local-datasource';
import TaskLogLocalDb from '../task-logs/datasources/local/db';
import { TaskLogLocalDatasource } from '../task-logs/datasources/local/task-log-local-datasource';
import TaskLocalDb from '../tasks/datasources/local/db';
import { TaskLocalDatasource } from '../tasks/datasources/local/task-local-datasource';

/**
 * Inject Local Databases
 */
container.register(
  ...AppDatabase.provideTable(ProfileLocalDb.TOKEN, ProfileLocalDb.TABLE_NAME),
);
container.register(
  ...AppDatabase.provideTable(TaskLocalDb.TOKEN, TaskLocalDb.TABLE_NAME),
);
container.register(
  ...AppDatabase.provideTable(TaskLogLocalDb.TOKEN, TaskLogLocalDb.TABLE_NAME),
);

/**
 * Inject Local/Remote Data Sources
 */
container.register(ProfileLocalDatasource.TOKEN, ProfileLocalDatasource);
container.register(TaskLocalDatasource.TOKEN, TaskLocalDatasource);
container.register(TaskLogLocalDatasource.TOKEN, TaskLogLocalDatasource);
