---
id: task-006
title: Data Export and Import Synchronization
epic: sync
wave: 2
depends_on: [task-001]
parallel_safe: true
estimate: S
---

## Goal
Allow users to manually backup and sync their data across devices using JSON files.

## Background / Context
Because the app is fully offline without a cloud backend, users need a way to move their profiles, goals, and tasks between their phone and laptop.

## Acceptance Criteria
- [ ] Create a "Settings" view.
- [ ] Implement an "Export Data" button that dumps all Dexie tables (`profiles`, `goals`, `tasks`) into a downloadable `.json` file.
- [ ] Implement an "Import Data" file input that reads a `.json` file, parses it, and overwrites/merges the Dexie database.
- [ ] Show success/error toast notifications for import/export actions.
- [ ] TypeScript/lint passes.
- [ ] Verify in browser using dev-browser skill.

## Technical Notes
- Dexie has community addons for export/import (like `dexie-export-import`), or it can be written manually by querying `toArray()` on all tables and using `Blob` for download.
- Be careful with import: clear existing data before importing to avoid ID conflicts, or do a smart upsert. Overwrite is safer for MVP.

## Out of Scope
- Automatic cloud sync.
- Conflict resolution UI for merging specific records.

## Dependencies Detail
| Depends On | Why |
|------------|-----|
| task-001   | Needs the database schema to exist to know what tables to export/import. |

## Open Questions
- None.
