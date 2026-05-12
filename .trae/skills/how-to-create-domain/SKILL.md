---
name: how-to-create-domain
description: Understanding how to create a new domain layer on the project.
---

## Overview
Create a new domain layer for the project.

## When to Use
Use this skill when we want to create new domain layer for the project.

## Instructions
When creating new domain layer, follow the steps steps:
- **Step 1:** Create folder under `src/domain/{domain-name}` with new domain name
- **Step 2:** for models, create folder under `src/domain/{domain-name}/models`
- **Step 3:** Create new model using Zod Schema
- **Step 4:** create repository interface as a contract under `src/domain/{domain-name}/{domain-name}-repository.ts`

## Example

- Folder structure of new domain for `product`
```
src/
├── domain/
|   └── products/
|       ├── models/
|       |   └── product.ts      
|       └── product-repository.ts   
```

- Product model (use the same schema as the product model)
```
import { z } from 'zod';

export const Product = z.object({
  id: z.string(),
  name: z.string(),
  price: z.number(),
});

export type Product = z.infer<typeof Product>;
```

- Product repository interface
```
export interface ProductRepository {
  create(product: Product): Promise<Product>;
}
```