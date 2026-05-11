---
id: task-006
title: Add date selection to Today dashboard for backfilling
epic: logging
wave: 4
depends_on: [task-005]
parallel_safe: true
estimate: S
---

## Goal

Allow users to pick any past date (and future, if desired) on the Today dashboard to backfill logs.

## Background / Context

PRD user story: US-005. Functional requirements: FR-7.

## Acceptance Criteria

- [ ] The Today dashboard includes a date picker that supports selecting past dates.
- [ ] The UI clearly indicates which date is being edited.
- [ ] Selecting a date updates the scheduled goal list and loads logs for that date.
- [ ] Edits are stored against the selected date, not the current day.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser that switching between dates shows the correct saved entries.

## Technical Notes

- Decide whether the selected date should be reflected in the URL (e.g., query param) for shareable/back-button-friendly navigation.

## Out of Scope

- Bulk editing across many dates.
- Stats changes.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-005 | Needs Today dashboard to extend |

## Open Questions

- Should future dates be selectable (for planning), or restrict to today/past only?
