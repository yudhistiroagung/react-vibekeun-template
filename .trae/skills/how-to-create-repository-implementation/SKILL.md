---
name: how-to-create-repository-implementation
description: Use this skill when we want to create NEW repository implementation on data layer.
---

## Instruction
- **Step 1:** Create class implementation in `/src/data/{data-name}/{data-name}-repository-impl.ts`
- **Step 2:** Import interface from `/src/domain/{data-name}/{data-name}-repository.ts`
- **Step 3:** Register class in DI container inside `src/di/index.ts`


Example of Product repository implementation
```ts
@singleton()
export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        @inject(ProductLocalDataSource.TOKEN) private readonly localDataSource: ProductDataSource<ProductEntity>,
        @inject(ProductRemoteDataSource.TOKEN) private readonly remoteDataSource: ProductDataSource<ProductDto>,
    ) {}

    async create(product: ProductEntity): Promise<ProductEntity> {}
}
```
