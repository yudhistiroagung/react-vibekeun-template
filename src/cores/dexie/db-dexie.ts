import { Dexie } from 'dexie';
import type { DependencyContainer } from 'tsyringe';
import { singleton } from 'tsyringe';

@singleton()
export class AppDatabase extends Dexie {
  static readonly NAME = 'AppDatabase';

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
