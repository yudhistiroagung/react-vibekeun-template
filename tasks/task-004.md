---
id: task-004
title: Implement goal scheduling engine for a selected date
epic: scheduling
wave: 2
depends_on: [task-002]
parallel_safe: true
estimate: M
---

## Goal

Given a date, compute which goals are scheduled for that day so the Today dashboard can show the right list.

## Background / Context

PRD user story: US-003. Functional requirements: FR-4, FR-5.

## Acceptance Criteria

- [ ] A function or module returns scheduled goals for a given date using persisted goal data.
- [ ] Daily repetitive goals are scheduled every day.
- [ ] Weekly repetitive goals are scheduled on selected weekdays.
- [ ] Monthly repetitive goals are scheduled on selected days-of-month.
- [ ] One-time goals have a defined scheduling rule and are included/excluded consistently.
- [ ] Unit tests cover scheduling for daily/weekly/monthly (including edge cases like months without a selected day).
- [ ] TypeScript/lint passes.

## Technical Notes

- Normalize dates to a stable day key.
- For monthly schedules with days like 29/30/31, define behavior for months that do not include that day (skip vs clamp); capture decision in tests.

## Out of Scope

- UI; this is logic only.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-002 | Uses goal schema fields and storage |

## Open Questions

- Monthly schedules: should “last day of month” be supported as a special option?
- One-time goals: appear on all days until deadline, or only on the deadline date?
