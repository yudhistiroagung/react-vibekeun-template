import { Dexie, type Table } from 'dexie';
import type { DependencyContainer } from 'tsyringe';
import { singleton } from 'tsyringe';

import type { ProfileEntity } from '@/data/profiles/models';
import type { TaskLogEntity } from '@/data/task-logs/models';
import type { TaskEntity } from '@/data/tasks/models';

@singleton()
export class AppDatabase extends Dexie {
  static readonly NAME = 'BehavioralTrackerDB';

  profiles!: Table<ProfileEntity, number>;
  tasks!: Table<TaskEntity, number>;
  taskLogs!: Table<TaskLogEntity, number>;

  constructor() {
    super(AppDatabase.NAME);

    this.initiate();
  }

  private initiate() {
    this.version(1).stores({
      profiles: '++id, name, isDefault, createdAt',
      tasks: '++id, profileId, type, createdAt',
      taskLogs: '++id, taskId, profileId, completedAt',
    });
  }

  static provideTable(token: string, tableName: string) {
    return [
      token,
      {
        useFactory: (c: DependencyContainer) =>
          c.resolve(AppDatabase).table(tableName),
      },
    ] as const;
  }
}
