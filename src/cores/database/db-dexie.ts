import { Dexie } from 'dexie';
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
  }
}
