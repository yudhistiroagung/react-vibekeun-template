# Architecture

## Overview
This project follows **Clean Architecture** — business logic is fully decoupled from external tools (databases, UI frameworks, network clients), making each layer independently testable and maintainable.

Data flows in one direction:

```
Presentation → Domain ← Data
                 ↑
               Core / DI
```

The Domain layer is the center. It knows nothing about the outside world. Presentation and Data both depend on it — never the other way around.

---

## Layers

### 1. Presentation
Handles UI and user interaction only. Contains no business logic.

| Part | Purpose |
|---|---|
| `components/` | Reusable UI components (Button, Input, etc.) |
| `hooks/` | One custom hook per use-case, powered by TanStack Query |
| `routes/` | Page-level components via TanStack Router |
| `routes/{name}/-components/` | Components scoped to that route only |
| `routes/{name}/{name}.hook.ts` | Presenter hook for that route |
| `layouts/` | Base layout wrappers |
| `utils/` | Formatting helpers (dates, numbers, etc.) |

---

### 2. Domain
The most stable layer. Contains pure business logic with **no framework dependencies**.

| Part | Purpose |
|---|---|
| `models/` | Plain business models (e.g. `Product`, `User`) |
| `{name}-repository.ts` | Repository **interface** only — defines what data is needed, not how to get it |

> Never import from `data/` or `presentation/` here.

---

### 3. Data
Implements the Domain's repository interfaces. Decides where data comes from.

| Part | Purpose |
|---|---|
| `models/` | `*-entity.ts` (local DB shape), `*-dto.ts` (remote API shape) |
| `mappers/` | Converts entity/DTO ↔ domain model |
| `datasources/local/` | Dexie/IndexedDB logic |
| `datasources/remote/` | API client logic (Axios, etc.) |
| Repository impl | Orchestrates datasources, returns domain models |

> The repository implementation is the only place that decides whether to read from local or remote.

---

### 4. Core
Shared infrastructure used across all layers.

| Part | Purpose |
|---|---|
| `cores/{library}/` | Bootstrap and config for external libraries (TanStack Query, Axios, Dexie, etc.) |

---

### 5. DI (Dependency Injection)
Wires all layers together using `tsyringe`. No business logic lives here.

| Part | Purpose |
|---|---|
| `di/index.ts` | Registers all classes and tokens into the container |

---

## Folder Structure

```
src/
├── cores/
│   └── {library}/                  # External library setup (tanstack-query, axios, dexie, etc.)
├── di/
│   └── index.ts                    # DI container registrations (tsyringe)
├── domain/
│   └── {domain-name}/
│       ├── models/                 # Business models (Zod schema + inferred type)
│       └── {name}-repository.ts   # Repository interface (contract only, no implementation)
├── data/
│   └── {data-name}/
│       ├── models/
│       │   ├── {name}-entity.ts   # Local DB model
│       │   └── {name}-dto.ts      # Remote API model
│       ├── mappers/               # entity/dto ↔ domain model conversion functions
│       └── datasources/
│           ├── {name}-datasource.ts    # Shared datasource interface
│           ├── local/
│           │   ├── db/index.ts         # Dexie table config + DI token
│           │   └── {name}-local-datasource.ts
│           └── remote/
│               └── {name}-remote-datasource.ts
└── presentation/
    ├── components/                 # Reusable UI components
    ├── hooks/                      # Shared custom hooks
    ├── layouts/                    # Base layout wrappers
    ├── utils/                      # Formatting helpers
    └── routes/
        └── {route-name}/
            ├── -components/            # Components scoped to this route
            ├── index.ts                # main route component
            └── {route-name}.hook.ts    # Presenter hook for this route
```

---

## Dependency Rule
| Layer | Can import from |
|---|---|
| Presentation | Domain, Core |
| Data | Domain, Core |
| Domain | Nothing (no imports from other layers) |
| Core | Nothing |
| DI | Everything (this is its job) |

Violating this table is an architecture bug.

---

## Skills Reference
Use these skills when scaffolding new features:

| Task | Skill |
|---|---|
| New domain layer | `create-domain-layer` |
| New data layer | `data-layer-scaffold` |
| New local datasource | `create-local-datasource` |
| New remote datasource | `create-remote-datasource` |
| New repository implementation | `create-repository-implementation` |