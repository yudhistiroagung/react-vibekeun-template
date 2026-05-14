ARCHITECTURE
=====================

## Overview
This architecture is a standard implementation of Clean Architecture. It ensures that  business logic is decoupled from external tools like databases or UI frameworks, making it easier to test and maintain.

Here is a breakdown of the architecture when using multiple data sources (e.g., Local Database and Remote API).

1. **Presentation Layer:** This layer is the entry point for the user. It handles the UI and user interactions.
- Components: Views (React Native, Flutter, or SwiftUI).
- Responsibility: It listens to user inputs, triggers actions in the Domain layer, and observes data changes to update the screen.

2. **Domain Layer:** The most stable and central part of the app. It contains the pure business logic.
- Models: Simple data models used across the app (e.g., User, Order).
- Repository Interfaces: Defines the contract for data operations. It tells the app what data is needed, but not how to get it.

3. **Data Layer:** The implementation detail of the Domain's repository interface. This is where Multiple Data Sources are managed. 

- Repository Implementation: The "Brain" that decides whether to fetch data from the Network or the Cache.Remote Data Source: Handles API calls (e.g., using Retrofit, Axios, or Ktor).
- Local Data Source: Handles local storage (e.g., Room, SQLite, or Hive).
- Mappers: Converts "Data Transfer Objects" (DTOs) from APIs into "Entities" used by the Domain layer.

4. **Core Layer:** This layer contains the core components of the app that are shared across multiple features.
- Components: initialization of TanStack Query, Axios, Retrofit, or other common code.

5. **DI:** Dependency Injection (DI) is used to manage the dependencies between the layers of the architecture. This layer is responsible for creating instances of the components in the layers above it and injecting them into the components below it.
- Components: DI Container, DI Module, or other DI tools.

## Folder Structure
```
src/
├── cores/
|   └── {external-library}/             # External libraries such as tanstack-query, axios, retrofit, etc
├── di/
|   └── index.ts                        # DI container using tsyringe
├── domain/
|   └── {domain-name}/
|       ├── models/                     # Business Model
|       ├── repository.ts               # INTERFACE only
├── data/
|   └── {data-name}/
|       ├── models/                     # DTOs (Data Transfer Objects)
|       ├── mappers/                    # Logic to convert data source DTO/entity ↔ Domain Model
|       └── datasources/
|           ├── local/                  # Database logic (Room/SQL)
|           └── remote/                 # API logic (Retrofit/Network)
├── presentation/
|   ├── components/                     # Reusalbe UI components such as Button, Input, etc
|   ├── hooks/                          # Business Logic using custom hooks per usecase using tanstack query
|   ├── routes/                         # Page component routes based on tanstack router
|   |   └── {route-name}/               # Page component such as `Dashboard Page/Screen`
|   |       ├── -components/            # Sub components for that spesific route
|   |       └── {route-name}.hook.ts/   # Custom hook as presenter
|   ├── utils/                          # Common utils such as date formatter, number formatter, etc
|   └── layouts/                        # Base Layout for the app
```

## Note
use Todo related code as example (this may be deleted soon since it is a placeholder code), or use existing code as reference to understand the architecture.
