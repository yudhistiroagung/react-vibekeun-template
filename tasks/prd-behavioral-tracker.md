# PRD: Behavioral Tracker App

## Introduction
A behavioral tracker application designed to help users build habits and complete goals. It supports multiple profiles, allowing different users (or different contexts) to track their progress independently. The app enables users to create both one-time goals and recurring habits, assigning custom point values to each. Data is stored locally using IndexedDB (via Dexie.js), and users can monitor their success through a comprehensive achievements dashboard.

## Goals
- Provide a robust local-first experience using IndexedDB (Dexie.js).
- Support multiple profiles with a default profile loaded on startup.
- Allow creation, completion, and management of one-time and recurring tasks.
- Gamify task completion using custom point values assigned by the user.
- Visualize progress through statistics (Total Score, Weekly Chart, Completion Rate, Daily Streaks).

## User Stories

### US-001: Data Model Setup & Initialization
**Description:** As a developer, I need to set up the IndexedDB schemas using Dexie.js so that Profile, Task, and TaskLog data can be stored locally.
**Acceptance Criteria:**
- [ ] Define `Profile` schema (id, name, isDefault, createdAt).
- [ ] Define `Task` schema (id, profileId, title, type: 'one-time'|'recurring', points, frequency, createdAt).
- [ ] Define `TaskLog` schema (id, taskId, profileId, completedAt, pointsEarned).
- [ ] Implement Dexie DB initialization and repository layers.
- [ ] Typecheck/lint passes.

### US-002: Profile Management
**Description:** As a user, I want to manage and switch between profiles so that my data is kept separate from others.
**Acceptance Criteria:**
- [ ] App loads a default profile on startup (creates one if none exist).
- [ ] "Profiles" navigation tab displays a list of all profiles.
- [ ] Users can create a new profile.
- [ ] Users can switch the active profile.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: App Navigation
**Description:** As a user, I want clear navigation so I can easily move between my daily tasks, profile settings, and achievements.
**Acceptance Criteria:**
- [ ] Implement bottom/side navigation with three tabs: Home, Profiles, Achievements.
- [ ] Active tab is visually highlighted.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Task Creation
**Description:** As a user, I want to create new tasks with custom points and recurrence settings so I can track my specific goals.
**Acceptance Criteria:**
- [ ] Form to input task title, points (number), and type (one-time vs recurring).
- [ ] If recurring, allow selecting frequency (e.g., daily).
- [ ] Task is saved to the active profile in IndexedDB.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Daily Task View & Completion
**Description:** As a user, I want to see my tasks for the day and mark them as complete to earn points.
**Acceptance Criteria:**
- [ ] "Home" tab displays tasks relevant to the current day.
- [ ] Users can click a checkbox/button to mark a task as complete.
- [ ] Completing a task creates a `TaskLog` entry with the assigned points.
- [ ] Completed tasks are visually crossed out or moved to a "Done" section.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-006: Achievements Dashboard
**Description:** As a user, I want to see my statistics so I can stay motivated by my progress.
**Acceptance Criteria:**
- [ ] "Achievements" tab shows Total Score (sum of all `TaskLog` points for the active profile).
- [ ] Displays Completion Rate (tasks completed / tasks due today).
- [ ] Displays Daily Streak (consecutive days with at least one `TaskLog`).
- [ ] Displays a Weekly Progress Chart (bar chart of points earned per day over the last 7 days).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Functional Requirements
- FR-1: The system must use Dexie.js for all data persistence (Local Storage).
- FR-2: The system must auto-create a default profile on first launch if none exists.
- FR-3: The system must allow users to assign a custom integer point value to each task.
- FR-4: The system must support 'one-time' and 'recurring' (daily/weekly) task types.
- FR-5: The system must calculate stats dynamically based on `TaskLog` entries.
- FR-6: The system must provide three main navigation routes: Home, Profiles, Achievements.

## Non-Goals (Out of Scope)
- Cloud synchronization or backend server implementation.
- Spendable rewards system or point shop.
- Social sharing or leaderboards.
- Push notifications (browser or native).

## Technical Considerations
- **Storage:** Dexie.js is already present in `src/cores/dexie/db-dexie.ts` per standard template setup.
- **UI:** Leverage Shadcn UI and Tailwind CSS.
- **State Management:** Use TanStack Query (already configured) for reading/writing to Dexie to handle reactivity gracefully.
- **Charts:** Use a lightweight charting library (e.g., Recharts) for the Weekly Progress Chart.

## Success Metrics
- App loads and functions entirely offline.
- Profile switching updates the UI and task lists in under 100ms.
- Users can create and complete a task with fewer than 4 interactions.

## Open Questions
- What charting library should be used for the weekly progress chart? (Defaulting to Recharts if not specified).
- How should we handle missed recurring tasks? (Assuming they just don't get logged for that day).
