---
id: task-007
title: Implement Stats page charts for rating and numeric goals
epic: stats
wave: 4
depends_on: [task-001, task-002, task-003]
parallel_safe: true
estimate: M
---

## Goal

Provide a Stats page that lets the user select a goal and view trend charts over time for rating and numeric goals.

## Background / Context

PRD user story: US-006. Functional requirements: FR-8.

## Acceptance Criteria

- [ ] `/stats` route renders a Stats page with a goal selector.
- [ ] Selecting a rating goal shows a trend chart over a selectable range (at least 30/90 days).
- [ ] Rating charts respect the goal’s custom min/max scale (axis and/or value constraints).
- [ ] Selecting a numeric goal shows a trend chart (optionally displaying unit).
- [ ] Loading/empty states are clear when there is no data for the selected goal.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser that charts update when switching goals and when new logs are added.

## Technical Notes

- Use an existing charting library already in the project, or add one (PRD suggests Recharts).
- Prefer a single query path that returns (date, value) series for a goal.
- Define how to handle missing days (gaps vs zeros); keep charts honest.

## Out of Scope

- Boolean streak metrics (handled in task-008).
- Advanced analytics (moving averages, goal grouping).

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-001 | Needs `/stats` route and shell layout |
| task-002 | Needs persisted logs |
| task-003 | Needs goals to exist and be selectable via UI |

## Open Questions

- Should the Stats range be configurable per goal or global (30/90/custom)?
