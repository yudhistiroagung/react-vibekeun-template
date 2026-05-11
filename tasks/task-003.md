---
id: task-003
title: Build goals create/edit/delete UI with scoring and schedule fields
epic: goal-management
wave: 2
depends_on: [task-001, task-002]
parallel_safe: true
estimate: L
---

## Goal

Allow users to create, edit, and delete goals, including scoring configuration and one-time/repetitive scheduling fields.

## Background / Context

PRD user stories: US-002, US-003. Functional requirements: FR-2, FR-3, FR-4.

## Acceptance Criteria

- [ ] A user can create a goal with title, goal type (one-time/repetitive), scoring type (boolean/rating/numeric).
- [ ] Rating goals allow configuring a per-goal min/max scale.
- [ ] Numeric goals allow configuring an optional unit label.
- [ ] One-time goals allow setting a deadline date.
- [ ] Repetitive goals allow choosing frequency:
  - [ ] Daily
  - [ ] Weekly (select one or more weekdays)
  - [ ] Monthly (select one or more days of month)
- [ ] A user can edit an existing goal and changes persist locally.
- [ ] A user can delete a goal and its associated logs are also deleted.
- [ ] Empty states are clear when no goals exist.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser that goals persist across refresh.

## Technical Notes

- Prefer a single goal form that conditionally renders fields based on goal/scoring type.
- Consider safe defaults (e.g., rating scale 1–5; weekly default to current weekday).
- Deletion cascade can be implemented as a transaction (delete logs where goalId matches, then delete goal).

## Out of Scope

- Paused/archived goal state (open question in PRD).
- Advanced validation (beyond basic required fields and sensible min/max).

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-001 | Needs `/goals` route and shell layout |
| task-002 | Needs persisted schema for goals/logs |

## Open Questions

- Should deleting a goal prompt for confirmation (modal) or be immediate?
