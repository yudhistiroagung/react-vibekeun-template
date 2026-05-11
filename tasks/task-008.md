---
id: task-008
title: Add boolean goal streak metrics and completion rate to Stats
epic: stats
wave: 5
depends_on: [task-007]
parallel_safe: false
estimate: S
---

## Goal

For boolean goals, show streak metrics (current and longest) and completion rate over a recent period.

## Background / Context

PRD user story: US-006. Functional requirements: FR-8 (boolean streak summaries).

## Acceptance Criteria

- [ ] Selecting a boolean goal shows:
  - [ ] Current streak
  - [ ] Longest streak
  - [ ] Completion rate over a defined range (at least last 30 days)
- [ ] Streak calculation is consistent with scheduling rules (only consider days the goal is scheduled).
- [ ] TypeScript/lint passes.
- [ ] Unit tests cover streak calculations (including gaps, missed scheduled days, and non-scheduled days).

## Technical Notes

- Define what counts as “completed” for boolean goals (e.g., value === true).
- Consider how notes-only logs should behave (if allowed for boolean goals).

## Out of Scope

- Charts for boolean goals.
- Notifications or reminders.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-007 | Extends the Stats page and selector infrastructure |

## Open Questions

- Should completion rate denominator include only scheduled days or all calendar days in the range?
