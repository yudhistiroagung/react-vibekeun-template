import { Dexie, type Table } from 'dexie';
import type { DependencyContainer } from 'tsyringe';
import { singleton } from 'tsyringe';
import type { GoalEntity } from '@/data/goals/models/goal-entity';
import type { ProfileEntity } from '@/data/profiles/models/profile-entity';
import type { TaskEntity } from '@/data/tasks/models/task-entity';

@singleton()
export class AppDatabase extends Dexie {
  static readonly NAME = 'AppDatabase';

  profiles!: Table<ProfileEntity, number>;
  goals!: Table<GoalEntity, number>;
  tasks!: Table<TaskEntity, number>;

  constructor() {
    super(AppDatabase.NAME);

    this.initiate();
  }

  private initiate() {
    this.version(1).stores({
      todos: '++id, name, status',
    });

    this.version(2).stores({
      profiles: '++id, name, createdAt',
      goals: '++id, profileId, title, createdAt',
      tasks: '++id, profileId, goalId, date, status, rating',
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
