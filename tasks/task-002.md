---
id: task-002
title: Profile Management and UI Shell
epic: profile-management
wave: 2
depends_on: [task-001]
parallel_safe: true
estimate: M
---

## Goal
Build the global UI shell (Header) and the ability to create, switch, and isolate active profiles.

## Background / Context
The application supports multiple users/contexts via "Profiles". All data (Goals, Tasks, Dashboard) is isolated to the currently active profile. The UI must be strictly monochrome.

## Acceptance Criteria
- [ ] Create a Header component with a Dropdown Menu (Shadcn) for switching profiles.
- [ ] Create a modal/dialog to add a new Profile (just requires a name).
- [ ] Display profile initials in the dropdown trigger.
- [ ] Implement a global state or context to track the `activeProfileId`.
- [ ] UI is strictly black, white, and zinc/slate grays.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Technical Notes
- If no profiles exist on first load, prompt the user to create one immediately.
- The `activeProfileId` should be persisted (e.g., in localStorage) so the user stays logged into the same profile on reload.

## Out of Scope
- Profile avatars/image uploads.
- Cloud synchronization of profiles.

## Dependencies Detail
| Depends On | Why |
|------------|-----|
| task-001   | Needs the `profiles` Dexie table to save and query profiles. |

## Open Questions
- None.
