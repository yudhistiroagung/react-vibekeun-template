export interface TaskLogDataSource<T> {
  getTaskLogsByProfile(profileId: number): Promise<T[]>;
  createTaskLog(taskLog: Omit<T, 'id'>): Promise<number>;
  deleteTaskLog(id: number): Promise<void>;
}
