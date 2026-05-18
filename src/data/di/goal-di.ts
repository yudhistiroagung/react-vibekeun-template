import { container } from 'tsyringe';
import { AppDatabase } from '@/cores/dexie/db-dexie';

import GoalLocalDb from '../goals/datasources/local/db';
import { GoalLocalDatasource } from '../goals/datasources/local/goal-local-datasource';
import { GoalRepositoryImpl } from '../goals/goal-repository-impl';
import { GoalRepository } from '@/domain/goals/goal-repository';

// Register Dexie table
container.register(
  ...AppDatabase.provideTable(GoalLocalDb.TOKEN, GoalLocalDb.TABLE_NAME),
);

// Register Datasource
container.register(GoalLocalDatasource.TOKEN, GoalLocalDatasource);

// Register Repository
container.register(GoalRepository.TOKEN, GoalRepositoryImpl);

