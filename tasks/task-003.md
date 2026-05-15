---
id: task-003
title: Goal Template Management
epic: goal-management
wave: 3
depends_on: [task-002]
parallel_safe: false
estimate: M
---

## Goal
Allow users to create and view recurring goal templates tied to their active profile.

## Background / Context
Goals act as templates (e.g., "Read a book", "Daily", "Profile: Personal"). These templates will later dictate how daily tasks are generated.

## Acceptance Criteria
- [ ] Create a "Goals" page/view showing a list of active goal templates.
- [ ] Create a form to add a new Goal with fields: Title, Description, and Frequency (Daily, Weekly, Monthly, One-time).
- [ ] Goal queries must strictly filter by the `activeProfileId`.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Technical Notes
- Frequency can be a simple enum string for now.
- Reuse Shadcn Form and Card components.
- Make sure to test empty states (when a profile has no goals yet).

## Out of Scope
- Generating actual actionable tasks (this is handled in task-004).
- Editing existing goals (can be added later if time permits, focus on creation first).

## Dependencies Detail
| Depends On | Why |
|------------|-----|
| task-002   | Needs the active profile context to save and filter goals correctly. |

## Open Questions
- None.
