---
name: how-to-create-data
description: Use this skill when we want to create NEW data layer for the project.
---

## Instructions
When creating new data layer, follow the steps steps:
- **Step 1:** Create folder under `src/data/{data-name}` with new data name
- **Step 2:** for models, create folder under `src/data/{data-name}/models`
- **Step 3:** Create new model using Zod Schema, there may be 2 different type of models, one is for local database and one is for remote database, local use `{model-name}-entity.ts` and remote use `{model-name}-dto.ts`, using Zod Schema to define the model schema
- **Step 4:** create data source, there will be at least 1 datasource, and may have multiple datasources, use this skill `how-to-create-local-datasource` or `how-to-create-remote-datasource` for detail implementation
- **Step 5:** create repository implementation, use this skill `how-to-create-repository-implementation` for detail implementation
- **Step 6:** create mapper functions to convert between entity and dto to domain model or vise versa

## Example

- Folder structure of new data for `product`
```
src/
├── data/
|   └── products/
|       ├── datasources/
|       ├── mappers/
|       |   └── product-mapper.ts      
|       ├── models/
|       |   └── product-entity.ts      
|       |   └── product-dto.ts      
|       └── product-repository-impl.ts   
```

- Product model (use the same schema as the product model)
```ts
import { z } from 'zod';

export const ProductEntity = z.object({
  id: z.string(),
  name: z.string(),
  unitCost: z.number(),
});

export type ProductEntity = z.infer<typeof ProductEntity>;

// or 
export const ProductDto = z.object({
  id: z.string(),
  name: z.string(),
  unit_cost: z.number(),
});

export type ProductDto = z.infer<typeof ProductDto>;
```

- Mapper implementation
```ts
export const productEntityDomain = (entity: ProductEntity): Product => ({ ... });
export const productDtoDomain = (entity: ProductEntity): Product => ({ ... });

```