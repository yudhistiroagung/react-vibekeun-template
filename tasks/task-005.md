---
id: task-005
title: Dashboard Analytics
epic: stats-dashboard
wave: 5
depends_on: [task-004]
parallel_safe: false
estimate: M
---

## Goal
Visualize user performance and task completion metrics using Recharts.

## Background / Context
The dashboard provides a high-level overview of how well the user is executing their goals. It must adhere to the monochrome design system.

## Acceptance Criteria
- [ ] Add `recharts` to the project.
- [ ] Calculate and display quick stats: "Completed Today (X/Y)" and "Current Streak" (days in a row with at least 1 completed task).
- [ ] Render a Donut chart showing overall Completion Rate (Completed vs Pending tasks).
- [ ] Render a Line or Bar chart showing Performance Trend (average 1-5 rating per day over the last 7/30 days).
- [ ] All charts use monochrome colors (black, white, gray).
- [ ] Dashboard data is strictly isolated to the `activeProfileId`.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Technical Notes
- Calculating streaks locally requires querying past task records ordered by date.
- Recharts colors can be set using standard hex codes (`#000000`, `#666666`, etc.) or Tailwind CSS variables.

## Out of Scope
- Custom date range pickers (stick to a fixed view like "Last 7 Days" or "This Month" for MVP).

## Dependencies Detail
| Depends On | Why |
|------------|-----|
| task-004   | Needs generated and rated tasks to have data to aggregate and visualize. |

## Open Questions
- Missed tasks are treated as "not completed" (no rating). They shouldn't drag down the *average rating* of completed tasks, but they do affect the completion rate chart.
