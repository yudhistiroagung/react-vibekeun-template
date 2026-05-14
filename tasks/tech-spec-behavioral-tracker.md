# Technical Specification: Behavioral Tracker App

## 1. Architecture Overview
The application is a client-side React single-page application (SPA) built with Vite.
- **Frontend Framework:** React 18+ (Vite)
- **Styling:** Tailwind CSS + Shadcn UI
- **Local Database:** IndexedDB via Dexie.js
- **State/Data Fetching:** TanStack Query (React Query)
- **Routing:** TanStack Router (already generated routes in `src/presentation/routes`)
- **Dependency Injection:** Tsyringe

## 2. Data Models (Dexie Schema)

### 2.1 Profile
Represents a user or a tracked context.
```typescript
interface ProfileEntity {
  id?: number; // Auto-incremented primary key
  name: string;
  isDefault: boolean;
  createdAt: number; // Timestamp
}
```

### 2.2 Task
Represents a goal or habit created by a user.
```typescript
interface TaskEntity {
  id?: number;
  profileId: number; // Foreign key to Profile
  title: string;
  type: 'one-time' | 'recurring';
  points: number;
  frequency?: 'daily' | 'weekly'; // Only for recurring tasks
  createdAt: number;
}
```

### 2.3 TaskLog
Records a completed instance of a task.
```typescript
interface TaskLogEntity {
  id?: number;
  taskId: number; // Foreign key to Task
  profileId: number; // Foreign key to Profile
  completedAt: number; // Timestamp
  pointsEarned: number; // Captured at the time of completion
}
```

### 2.4 Database Configuration
The Dexie instance (`src/cores/dexie/db-dexie.ts`) should be updated to include the above tables:
```typescript
class AppDatabase extends Dexie {
  profiles!: Table<ProfileEntity, number>;
  tasks!: Table<TaskEntity, number>;
  taskLogs!: Table<TaskLogEntity, number>;

  constructor() {
    super('BehavioralTrackerDB');
    this.version(1).stores({
      profiles: '++id, name, isDefault, createdAt',
      tasks: '++id, profileId, type, createdAt',
      taskLogs: '++id, taskId, profileId, completedAt'
    });
  }
}
```

## 3. Directory Structure Additions
Using Clean Architecture principles (Domain, Data, Presentation):

### Domain Layer
- `src/domain/profiles/`
- `src/domain/tasks/`
- `src/domain/task-logs/`
Contains Interfaces, Entities, and Use Cases (if any).

### Data Layer
- `src/data/profiles/`
- `src/data/tasks/`
- `src/data/task-logs/`
Contains Dexie Data Sources, Repositories implementations, and Mappers.

### Presentation Layer
- `src/presentation/routes/`
  - `/` (Home - Daily Tasks)
  - `/profiles` (Profile Management)
  - `/achievements` (Stats Dashboard)
- `src/presentation/components/` (Shared UI components like TaskCard, ProgressChart)
- `src/presentation/hooks/` (Custom React Query hooks `useProfiles`, `useTasks`, `useCompleteTask`, etc.)

## 4. Key Workflows & API (Local)

### 4.1 Loading Active Profile
- On app initialization, query `db.profiles.where({ isDefault: true }).first()`.
- If not found, create a default profile `id: 1, name: "Default User", isDefault: true`.
- Store the `activeProfileId` in a React Context or a lightweight global state (Zustand/Jotai, or just use React Query with a specific key).

### 4.2 Fetching Today's Tasks
- Fetch all `tasks` for `activeProfileId`.
- Fetch all `taskLogs` for `activeProfileId` where `completedAt` is within the current day (midnight to 11:59 PM).
- For `recurring` tasks: Show them on the Home tab. If a `taskLog` exists for today, mark as completed.
- For `one-time` tasks: Show them on the Home tab. If a `taskLog` exists, they are completed and can optionally be hidden.

### 4.3 Completing a Task
- User clicks "Complete" on a task.
- A new `TaskLog` is inserted into `db.taskLogs`.
- Invalidate the TanStack Query cache for `tasks` and `taskLogs` to trigger UI updates.

### 4.4 Achievement Calculations
- **Total Score:** `db.taskLogs.where({ profileId: activeProfileId }).toArray()`, then reduce by summing `pointsEarned`.
- **Weekly Progress Chart:** Aggregate `taskLogs` over the last 7 days, grouped by day (e.g., Mon: 50, Tue: 100).
- **Completion Rate:** (Number of unique tasks with a log today) / (Total active tasks applicable today).
- **Daily Streak:** Sort `taskLogs` by day. Iterate backwards from today to find consecutive days with >0 logs.

## 5. Third-Party Dependencies
- **Recharts:** To be added for rendering the Weekly Progress Chart (`npm install recharts`).
- **date-fns:** (If not already present) for robust date manipulations, useful for finding "start of day", "end of day", and streaks.
