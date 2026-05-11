---
id: task-005
title: Build Today dashboard with per-goal logging controls
epic: logging
wave: 3
depends_on: [task-001, task-002, task-004]
parallel_safe: false
estimate: L
---

## Goal

Provide a single Today screen that lists goals scheduled for a selected date and lets the user quickly enter outcomes with immediate persistence.

## Background / Context

PRD user story: US-004. Functional requirements: FR-5, FR-6.

## Acceptance Criteria

- [ ] The home route (`/`) shows a Today dashboard with a visible selected date.
- [ ] The dashboard lists all active goals scheduled for that date.
- [ ] Each goal row renders an input that matches scoring type:
  - [ ] Boolean: toggle/checkbox.
  - [ ] Rating: input constrained to the goal’s min/max scale.
  - [ ] Numeric: number input with optional unit label.
- [ ] Updating an entry upserts a log for (goalId, date).
- [ ] Optional notes can be attached to a log entry and are persisted.
- [ ] Existing logs for the selected date are loaded and displayed on screen load.
- [ ] Clear empty state when there are no goals scheduled for the selected date.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser that updates persist across refresh and changing the selected date restores prior entries.

## Technical Notes

- Use the scheduling engine (task-004) to compute the goal list for the selected day.
- Store date in a normalized string key for log lookup and upsert.
- Consider debouncing or explicit save for numeric/rating inputs if rapid typing would cause excessive writes; keep behavior predictable.

## Out of Scope

- Date picker/backfill UI (handled in task-006).
- Stats view.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-001 | Needs `/` route and shell layout |
| task-002 | Needs persisted goals/logs schema and upsert capability |
| task-004 | Needs “scheduled for date” list logic |

## Open Questions

- Should clearing an input delete the log row, or store an explicit empty/zero value?
