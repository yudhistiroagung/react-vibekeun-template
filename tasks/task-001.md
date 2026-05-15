---
id: task-001
title: Setup Dexie Database Schema and PWA Manifest
epic: data-layer
wave: 1
depends_on: []
parallel_safe: true
estimate: S
---

## Goal
Set up the local IndexedDB database using Dexie.js with the necessary schemas, and configure the app as a Progressive Web App (PWA).

## Background / Context
The app relies entirely on local storage for offline-first functionality. We need tables for Profiles, Goals (templates), and Tasks (instances). Also, to make the app installable on HP and laptops, a basic PWA manifest and service worker configuration must be added to Vite.

## Acceptance Criteria
- [ ] Initialize Dexie database with tables: `profiles`, `goals`, and `tasks`.
- [ ] Define TypeScript interfaces/types for the DB models.
- [ ] Add `vite-plugin-pwa` (if not present) and configure `manifest.json` for a monochrome-themed PWA.
- [ ] TypeScript/lint passes.

## Technical Notes
- Schema relations: `goals` belong to a `profileId`. `tasks` belong to a `goalId` and `profileId`.
- PWA icons can be placeholder black/white squares for now.
- `tasks` should have fields for `date` (YYYY-MM-DD), `status` (completed/pending), and `rating` (1-5).

## Out of Scope
- Building UI components.
- Actual data insertion or querying logic (just the schema definition).

## Dependencies Detail
| Depends On | Why |
|------------|-----|
| None       | Foundational setup required before any features can be built. |

## Open Questions
- None.
