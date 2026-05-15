---
id: task-004
title: Task Generation and Rating Execution
epic: task-execution
wave: 4
depends_on: [task-003]
parallel_safe: false
estimate: L
---

## Goal
Automatically generate daily tasks based on goal templates and allow users to complete them using a 1-5 rating slider.

## Background / Context
This is the core interaction of the app. Every day, the system should check the user's goals and create specific "Task" instances for today. Users then rate their execution of these tasks.

## Acceptance Criteria
- [ ] Implement logic that runs on app load: checks if tasks for today exist for the active profile's goals, and generates them if not.
- [ ] Create a "Today's Tasks" view displaying generated tasks.
- [ ] Implement a draggable 1-5 slider (Shadcn Slider) on each task card.
- [ ] When the slider is adjusted, mark the task as completed and save the rating to Dexie.
- [ ] Task queries must strictly filter by `activeProfileId`.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Technical Notes
- The generation logic needs to handle date boundaries safely (e.g., comparing local date strings like `YYYY-MM-DD`).
- For MVP, generation can just focus on "Daily" and "One-time" frequencies if Weekly/Monthly logic gets too complex, but strive to handle all.

## Out of Scope
- Complex timezone synchronization (rely on local device time).

## Dependencies Detail
| Depends On | Why |
|------------|-----|
| task-003   | Needs Goal templates to exist in the database to generate Tasks from them. |

## Open Questions
- Should users be able to edit a rating after submitting it on the same day? (Assume yes, slider can be re-adjusted).
