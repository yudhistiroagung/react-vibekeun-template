---
name: how-to-create-remote-datasource
description: create NEW remote datasource on data layer.
---

Use this skill when we want to create NEW remote datasource on data layer.

## Instruction
When creating a new datasource, we need to follow the steps:
- **Step 1:** Create folder under `src/data/{data-name}/datasources/` if not exist
- **Step 2:** Create interface `src/data/{data-name}/datasources/{data-name}-datasource.ts` if not exist
- **Step 3:** for remote datasource, create folder under `src/data/{data-name}/datasources/remote/`

