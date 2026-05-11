---
id: task-009
title: Implement responsive navigation (mobile bottom nav, desktop sidebar)
epic: navigation
wave: 2
depends_on: [task-001]
parallel_safe: true
estimate: S
---

## Goal

Provide device-appropriate navigation: bottom tab bar on mobile and left sidebar on desktop, highlighting the active route.

## Background / Context

PRD user story: US-007. Functional requirements: FR-9.

## Acceptance Criteria

- [ ] On mobile-sized viewports, navigation renders as a bottom tab bar with Today, Goals, Stats.
- [ ] On desktop-sized viewports, navigation renders as a left sidebar with the same destinations.
- [ ] Navigation highlights the active route.
- [ ] Layout does not cause horizontal scrolling on common device sizes.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser on mobile + desktop viewports.

## Technical Notes

- Prefer reusing existing UI primitives (Tailwind/shadcn) already in the codebase.
- Ensure the main content area accounts for bottom nav height on mobile.

## Out of Scope

- Additional destinations or settings pages.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| task-001 | Needs app shell and routes |

## Open Questions

- What breakpoint should define “mobile” vs “desktop” for nav behavior?
