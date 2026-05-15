# PRD: Minimalist Offline Goal Tracker

## Introduction

A Progressive Web App (PWA) designed to track personal goals (daily, weekly, monthly, or one-time) with a strong emphasis on offline-first functionality and a clean, minimalist monochrome (black and white) design. The app separates the concept of "Goals" (templates) and "Tasks" (instances generated from goals), allowing users to rate their daily task execution on a 1-5 scale using a slider. It also supports multiple isolated profiles and data synchronization via JSON export/import.

## Goals

- Provide a fully offline-capable experience using IndexedDB (Dexie.js).
- Implement a strict monochrome (black/white/gray) design system.
- Support multiple isolated user profiles within the same device.
- Automate task generation based on recurring goal schedules.
- Visualize performance and completion metrics clearly via a dashboard.
- Allow cross-device data mobility via manual JSON export/import.

## User Stories

### US-001: Profile Management & Isolation
**Description:** As a user, I want to create and switch between multiple profiles so that I can separate my goals (e.g., Work vs. Personal) without them mixing.

**Acceptance Criteria:**
- [ ] Header contains a profile switcher dropdown.
- [ ] Users can create a new profile with just a name (UI uses initials).
- [ ] Switching profiles completely isolates and reloads the Dashboard, Goals, and Tasks data.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-002: Goal Template Creation
**Description:** As a user, I want to create goals with specific schedules (daily, weekly, monthly, one-time) so that the app knows when I need to do them.

**Acceptance Criteria:**
- [ ] Form to create a Goal with title, description, and frequency selector.
- [ ] Save goal data to local Dexie.js database.
- [ ] Goals list view showing all active goal templates.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-003: Task Generation & Rating Execution
**Description:** As a user, I want to see my generated tasks for today and rate my performance using a 1-5 slider so that I can track my execution quality.

**Acceptance Criteria:**
- [ ] System automatically generates "Task" records for the current day based on active Goal schedules.
- [ ] Task card shows a 1-5 slider for rating upon completion.
- [ ] Sliding the value marks the task as completed with the corresponding rating.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-004: Dashboard Analytics
**Description:** As a user, I want to see my statistics on a dashboard so that I can evaluate my overall progress and consistency.

**Acceptance Criteria:**
- [ ] Display quick stats: "Completed Today (e.g., 4/5)" and "Current Streak".
- [ ] Display a Donut/Pie Chart for Completion Rate using Recharts (monochrome colors).
- [ ] Display a Line/Bar Chart for Performance Trend (average rating 1-5 over time).
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

### US-005: Data Export and Import
**Description:** As a user, I want to export my data to a file and import it on another device so that I can keep my data synchronized across my HP and Laptop without relying on the internet.

**Acceptance Criteria:**
- [ ] Settings page with "Export Data" button that downloads a `.json` file containing all Dexie data.
- [ ] "Import Data" button that reads a `.json` file and safely overwrites/merges into the local Dexie database.
- [ ] Typecheck/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Functional Requirements

- **FR-1:** The app must be installable as a PWA (manifest.json and service worker configuration).
- **FR-2:** The app must store all data in IndexedDB via `dexie`. No external API calls for data storage.
- **FR-3:** The UI must use Tailwind CSS and Shadcn UI with a strict monochrome color palette (black, white, zinc/slate grays).
- **FR-4:** The rating mechanism must use a draggable slider component (1 to 5 scale).
- **FR-5:** Dashboard charts must be rendered using `recharts` and adhere to the monochrome theme.
- **FR-6:** Data isolation must be strictly enforced at the database query level based on the `activeProfileId`.

## Non-Goals (Out of Scope)

- Cloud synchronization or centralized backend database.
- Push notifications or email reminders.
- Social sharing or leaderboards.
- Colorful themes or customizable color palettes.
- Image/Avatar uploads for profiles (initials only).

## Design Considerations

- **UI/UX:** Minimalist, high contrast. Use borders and subtle gray backgrounds to separate elements instead of colors.
- **Components:** Reuse Shadcn UI components (Card, Button, Slider, Dropdown Menu, Dialog, Form).
- **Typography:** Clean sans-serif (Inter/Geist) to maintain the modern aesthetic.

## Technical Considerations

- **Tech Stack:** React 19, Vite, Tailwind CSS v3, Shadcn UI, Dexie.js, Recharts, Tsyringe (existing in template).
- **Task Generation Logic:** Needs a reliable hook or utility that runs on app load/focus to check if today's tasks for recurring goals have been generated, and if not, creates them.
- **Export/Import:** Ensure the imported JSON schema matches the Dexie database schema to prevent corruption.

## Success Metrics

- Users can create a goal and rate a generated task in under 3 clicks.
- Charts render instantly (< 500ms) even with hundreds of historical task records.
- 100% offline functionality (app works entirely disconnected from the internet after initial load/install).

## Open Questions

- Should the current streak be calculated per profile globally, or per individual goal? (Defaulting to global per profile for now).
- How should missed tasks be handled in the performance trend chart? (e.g., recorded as 0, or excluded from the average rating).
