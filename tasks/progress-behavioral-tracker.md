# Behavioral Tracker - Progress Tracking

## US-001: Data Model Setup & Initialization
- [x] Define `Profile` schema (id, name, isDefault, createdAt).
- [x] Define `Task` schema (id, profileId, title, type: 'one-time'|'recurring', points, frequency, createdAt).
- [x] Define `TaskLog` schema (id, taskId, profileId, completedAt, pointsEarned).
- [x] Implement Dexie DB initialization and repository layers.
- [x] Typecheck/lint passes.

## US-002: Profile Management
- [x] App loads a default profile on startup (creates one if none exist).
- [x] "Profiles" navigation tab displays a list of all profiles.
- [x] Users can create a new profile.
- [x] Users can switch the active profile.
- [x] Typecheck/lint passes.
- [x] Verify in browser using dev-browser skill.

## US-003: App Navigation
- [ ] Implement bottom/side navigation with three tabs: Home, Profiles, Achievements.
- [ ] Active tab is visually highlighted.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

## US-004: Task Creation
- [ ] Form to input task title, points (number), and type (one-time vs recurring).
- [ ] If recurring, allow selecting frequency (e.g., daily).
- [ ] Task is saved to the active profile in IndexedDB.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

## US-005: Daily Task View & Completion
- [ ] "Home" tab displays tasks relevant to the current day.
- [ ] Users can click a checkbox/button to mark a task as complete.
- [ ] Completing a task creates a `TaskLog` entry with the assigned points.
- [ ] Completed tasks are visually crossed out or moved to a "Done" section.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

## US-006: Achievements Dashboard
- [ ] "Achievements" tab shows Total Score (sum of all `TaskLog` points for the active profile).
- [ ] Displays Completion Rate (tasks completed / tasks due today).
- [ ] Displays Daily Streak (consecutive days with at least one `TaskLog`).
- [ ] Displays a Weekly Progress Chart (bar chart of points earned per day over the last 7 days).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.
