export interface ProfileDataSource<T> {
  getProfiles(): Promise<T[]>;
  getDefaultProfile(): Promise<T | undefined>;
  createProfile(profile: Omit<T, 'id'>): Promise<number>;
  updateProfile(id: number, profile: Partial<T>): Promise<number>;
}
