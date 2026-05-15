import { Dexie, type Table } from 'dexie';
import type { DependencyContainer } from 'tsyringe';
import { singleton } from 'tsyringe';

export interface ProfileDbModel {
  id?: number;
  name: string;
  createdAt: number;
}

export interface GoalDbModel {
  id?: number;
  profileId: number;
  title: string;
  description?: string;
  createdAt: number;
}

export interface TaskDbModel {
  id?: number;
  profileId: number;
  goalId: number;
  date: string;
  status: 'completed' | 'pending';
  rating?: number;
  createdAt: number;
}

@singleton()
export class AppDatabase extends Dexie {
  static readonly NAME = 'AppDatabase';

  profiles!: Table<ProfileDbModel, number>;
  goals!: Table<GoalDbModel, number>;
  tasks!: Table<TaskDbModel, number>;

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
