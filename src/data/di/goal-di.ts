import { container } from 'tsyringe';
import { AppDatabase } from '@/cores/dexie/db-dexie';

import GoalLocalDb from '../goals/datasources/local/db';
import { GoalLocalDatasource } from '../goals/datasources/local/goal-local-datasource';

// Register Dexie table
container.register(
  ...AppDatabase.provideTable(GoalLocalDb.TOKEN, GoalLocalDb.TABLE_NAME),
);

// Register Datasource
container.register(GoalLocalDatasource.TOKEN, GoalLocalDatasource);
