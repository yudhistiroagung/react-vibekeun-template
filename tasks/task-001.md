---
id: task-001
title: Routing and app shell for Today/Goals/Stats
epic: navigation
wave: 1
depends_on: []
parallel_safe: true
estimate: S
---

## Goal

Provide the core routes (`/`, `/goals`, `/stats`) and an app shell layout so all feature screens have a consistent frame.

## Background / Context

PRD sections: Navigation, Technical Considerations (React + TanStack Router), Routes: `/`, `/goals`, `/stats`.

## Acceptance Criteria

- [ ] App has routes for `/`, `/goals`, `/stats` and each renders a placeholder page section.
- [ ] A shared layout/shell wraps these routes so navigation can be added later without refactoring routes.
- [ ] Active route can be derived (for future nav highlighting).
- [ ] TypeScript/lint passes.

## Technical Notes

- Follow existing project routing conventions (TanStack Router).
- Keep pages minimal; focus on stable route structure and a shared layout component.

## Out of Scope

- Full responsive navigation UI (handled in task-009).
- Goal CRUD, logging, or stats functionality.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| — | — |

## Open Questions

- None for this task.
