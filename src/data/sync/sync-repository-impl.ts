import { inject, injectable } from 'tsyringe';
import { AppDatabase } from '../../cores/dexie/db-dexie';
import type { SyncRepository } from '../../domain/sync/sync-repository';

@injectable()
export class SyncRepositoryImpl implements SyncRepository {
  constructor(@inject(AppDatabase) private readonly db: AppDatabase) {}

  async exportData(): Promise<Blob> {
    const profiles = await this.db.profiles.toArray();
    const goals = await this.db.goals.toArray();
    const tasks = await this.db.tasks.toArray();

    const data = {
      profiles,
      goals,
      tasks,
    };

    return new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json',
    });
  }

  async importData(file: File): Promise<void> {
    const text = await file.text();
    const data = JSON.parse(text);

    await this.db.transaction(
      'rw',
      this.db.profiles,
      this.db.goals,
      this.db.tasks,
      async () => {
        await this.db.profiles.clear();
        await this.db.goals.clear();
        await this.db.tasks.clear();

        if (data.profiles && data.profiles.length > 0) {
          await this.db.profiles.bulkAdd(data.profiles);
        }
        if (data.goals && data.goals.length > 0) {
          await this.db.goals.bulkAdd(data.goals);
        }
        if (data.tasks && data.tasks.length > 0) {
          await this.db.tasks.bulkAdd(data.tasks);
        }
      },
    );
  }
}
