---
name: how-to-create-remote-datasource
description: Understanding how to create a new datasource on data layer providing remote source(s).
---

## Overview
This layer will be responsible for fetching data from remote servers.

## When to Use
Use this skill when we want to create new datasource on data layer remote source(s).

## Instruction
When creating a new datasource, we need to follow the steps:
- **Step 1:** Create folder under `src/data/{data-name}/datasources/`
- **Step 2:** Create interface `src/data/{data-name}/datasources/{data-name}-datasource.ts`
- **Step 3:** for remote datasource, create folder under `src/data/{data-name}/datasources/remote/`

