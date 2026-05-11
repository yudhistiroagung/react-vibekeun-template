import { Dexie, type Table } from 'dexie';
import type { DependencyContainer } from 'tsyringe';
import { singleton } from 'tsyringe';

import type { GoalEntity } from '@/data/goals/models/goal-entity';
import type { LogEntity } from '@/data/logs/models/log-entity';

@singleton()
export class AppDatabase extends Dexie {
  static readonly NAME = 'AppDatabase';

  goals!: Table<GoalEntity, string>;
  logs!: Table<LogEntity, string>;

  constructor() {
    super(AppDatabase.NAME);

    this.initiate();
  }

  private initiate() {
    this.version(1).stores({
      todos: '++id, name, status',
    });
    this.version(2).stores({
      goals: 'id, goalType',
      logs: 'id, &[goalId+date], goalId, date',
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
