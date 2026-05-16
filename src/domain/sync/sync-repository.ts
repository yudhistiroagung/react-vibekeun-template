export interface SyncRepository {
  exportData(): Promise<Blob>;
  importData(file: File): Promise<void>;
}
