# PRD: Behavior Tracker

## Introduction/Overview
Build a local-first behavior tracker that lets a user define goals (one-time or repetitive) and log daily outcomes with self-assessed scoring. The app focuses on fast daily entry (“Today” dashboard) and trend visibility (“Stats”) so users can see improvements over time. Data is stored locally (Dexie/IndexedDB) for MVP.

## Goals
- Enable users to create goals for habits/activities (sleep, exercise, eating, reading, etc.).
- Support one-time and repetitive goals with flexible scheduling.
- Support multiple scoring types: boolean, rating, numeric.
- Make daily logging fast via a single “Today” screen.
- Provide chart-based stats to visualize improvement and trends.
- Provide responsive UI: mobile-first bottom navigation and desktop sidebar.

## User Stories

### US-001: Store goals and logs locally
**Description:** As a user, I want my goals and logs stored on my device so my data persists without needing an account.

**Acceptance Criteria:**
- [ ] Create a local database using Dexie/IndexedDB.
- [ ] Persist `goals` and `logs` with stable IDs.
- [ ] Support schema fields needed for scheduling and scoring types.
- [ ] Typecheck/lint passes.

### US-002: Create and manage goals
**Description:** As a user, I want to create, edit, and delete goals so I can track what matters to me.

**Acceptance Criteria:**
- [ ] A user can create a goal with: title, type (one-time/repetitive), scoring type (boolean/rating/numeric).
- [ ] For rating goals, a user can set a custom scale (min/max, e.g., 1–5 or 1–10) per goal.
- [ ] For numeric goals, a user can set optional unit text (e.g., “km”, “pages”, “hours”).
- [ ] For one-time goals, a user can set a deadline date.
- [ ] A user can edit and delete goals.
- [ ] Deleting a goal also deletes its associated logs.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: Define repetitive goal schedules
**Description:** As a user, I want to schedule repetitive goals so they appear on the right days.

**Acceptance Criteria:**
- [ ] A repetitive goal supports frequency: daily, weekly, monthly.
- [ ] Weekly goals allow selecting one or more weekdays.
- [ ] Monthly goals allow selecting one or more days of month (e.g., 1, 15, 30).
- [ ] The “Today” view includes only goals scheduled for the selected date.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Log a goal on “Today” dashboard
**Description:** As a user, I want to log all of today’s goals from one screen so daily tracking is quick.

**Acceptance Criteria:**
- [ ] The home route (`/`) shows a “Today” dashboard with the selected date.
- [ ] The dashboard lists all active goals scheduled for that date.
- [ ] The input control matches scoring type:
  - [ ] Boolean: toggle/checkbox.
  - [ ] Rating: control constrained to the goal’s custom min/max.
  - [ ] Numeric: number input (optional unit label).
- [ ] Updating an entry saves an upserted log for (goalId, date).
- [ ] Optional notes can be attached to a log entry.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Backfill logs for any past date
**Description:** As a user, I want to log past days so I can fill gaps and keep my history accurate.

**Acceptance Criteria:**
- [ ] The “Today” dashboard supports selecting any past date (date picker).
- [ ] Logs are stored against the selected date (not just current day).
- [ ] The UI clearly indicates which date is being edited.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-006: View progress and trends in Stats
**Description:** As a user, I want charts and summaries so I can see improvement over time.

**Acceptance Criteria:**
- [ ] A stats route (`/stats`) displays trend charts for rating and numeric goals.
- [ ] Users can choose a goal to visualize (goal selector).
- [ ] Rating charts respect the goal’s custom min/max.
- [ ] Boolean goals show streak metrics (current streak, longest streak) and completion rate.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-007: Responsive navigation (mobile bottom nav, desktop sidebar)
**Description:** As a user, I want navigation optimized for my device so the app is comfortable on mobile and desktop.

**Acceptance Criteria:**
- [ ] On mobile-sized viewports, navigation is a bottom tab bar (Today, Goals, Stats).
- [ ] On desktop-sized viewports, navigation is a left sidebar with the same destinations.
- [ ] Navigation highlights the active route.
- [ ] Layout does not cause horizontal scrolling on common device sizes.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill (mobile + desktop viewports).

## Functional Requirements
- FR-1: The system must store all data locally using IndexedDB via Dexie.
- FR-2: The system must allow creating goals with scoring types: boolean, rating, numeric.
- FR-3: The system must allow rating goals to define a custom scale (min/max) per goal.
- FR-4: The system must allow repetitive goals with frequency: daily, weekly (with weekdays), monthly (with days-of-month).
- FR-5: The system must generate a “scheduled for date” list of goals for any selected date.
- FR-6: The system must upsert one log per goal per date (goalId + date unique).
- FR-7: The system must support editing logs for any past date via date selection.
- FR-8: The system must provide a stats view with charts for rating/numeric and streak summaries for boolean.
- FR-9: The system must provide bottom navigation on mobile and sidebar navigation on desktop.

## Non-Goals (Out of Scope)
- No authentication/login.
- No cloud sync or multi-device syncing.
- No notifications/reminders.
- No social/community features.
- No AI insights/recommendations.

## Design Considerations
- Mobile-first layout with bottom navigation; desktop layout with sidebar.
- “Today” dashboard optimized for rapid entry: minimal taps and immediate persistence.
- Clear empty states (e.g., no goals scheduled for date).

## Technical Considerations
- Use existing project stack: React + TanStack Router, Tailwind/shadcn components, Dexie for local storage.
- Use a charting library (e.g., Recharts) for stats visualizations.
- Prefer URL-safe routing structure: `/`, `/goals`, `/stats`.

## Success Metrics
- Users can create a goal and record the first log in under 60 seconds.
- Daily logging for 5 goals can be completed in under 30 seconds.
- Data persists across refresh and browser restarts.
- Stats page can show trends for the last 30/90 days without noticeable lag for typical personal usage.

## Open Questions
- Should monthly schedules support “last day of month” as an option?
- Should one-time goals also appear on “Today” only until deadline, or only on the deadline date?
- Should goals support “paused/archived” state for stopping without deleting history?
