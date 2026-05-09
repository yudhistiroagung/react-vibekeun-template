import { Dexie } from 'dexie';
import type { DependencyContainer } from 'tsyringe';
import { singleton } from 'tsyringe';

@singleton()
export class AppDatabase extends Dexie {
  static readonly NAME = 'TodoAppDatabase';

  constructor() {
    super(AppDatabase.NAME);

    this.initiate();
  }

  private initiate() {
    this.version(1).stores({
      todos: 'id, userId, name, status, created_at',
      users: 'id, username',
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
