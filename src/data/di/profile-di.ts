import { container } from 'tsyringe';
import { AppDatabase } from '@/cores/dexie/db-dexie';

import ProfileLocalDb from '../profiles/datasources/local/db';
import { ProfileLocalDatasource } from '../profiles/datasources/local/profile-local-datasource';
import { ProfileRepositoryImpl } from '../profiles/profile-repository-impl';
import { ProfileRepository } from '@/domain/profiles/profile-repository';

// Register Dexie table
container.register(
  ...AppDatabase.provideTable(ProfileLocalDb.TOKEN, ProfileLocalDb.TABLE_NAME),
);

// Register Datasource
container.register(ProfileLocalDatasource.TOKEN, ProfileLocalDatasource);

// Register Repository
container.register(ProfileRepository.TOKEN, ProfileRepositoryImpl);

