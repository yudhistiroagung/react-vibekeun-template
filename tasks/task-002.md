---
id: task-002
title: Create Dexie database schema for goals and logs
epic: data-layer
wave: 1
depends_on: []
parallel_safe: true
estimate: M
---

## Goal

Persist goals and daily logs locally in IndexedDB (Dexie) with stable IDs and a unique log per (goalId, date).

## Background / Context

PRD user story: US-001. Functional requirements: FR-1, FR-6.

## Acceptance Criteria

- [ ] A Dexie database is created and used for local persistence.
- [ ] `goals` table is persisted with stable IDs and fields required for scheduling and scoring.
- [ ] `logs` table is persisted with stable IDs and fields required for per-day entries (score + optional notes).
- [ ] Logs support an upsert model that enforces one log per (goalId, date) (unique compound index).
- [ ] Schema is typed (TypeScript types for Goal and Log).
- [ ] TypeScript/lint passes.

## Technical Notes

- Goal fields to support:
  - title
  - goalType: one-time | repetitive
  - scoringType: boolean | rating | numeric
  - ratingScale: { min, max } (only for rating)
  - numericUnit: string | null (only for numeric)
  - deadlineDate: string | null (only for one-time)
  - schedule: frequency daily | weekly | monthly, plus weekdays/daysOfMonth (only for repetitive)
  - createdAt/updatedAt timestamps
- Log fields to support:
  - goalId
  - date (normalized day key, e.g. YYYY-MM-DD in local time)
  - value (boolean | number) depending on scoring type
  - notes (optional)
  - createdAt/updatedAt timestamps

## Out of Scope

- Any UI for creating goals or entering logs.
- Cloud sync, auth, or multi-device data.

## Dependencies Detail

| Depends On | Why |
|------------|-----|
| — | — |

## Open Questions

- What is the canonical date normalization strategy (local midnight vs UTC) for day keys?
