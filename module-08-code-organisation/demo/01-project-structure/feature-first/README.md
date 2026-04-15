# Approach 2 - Feature-first (group by domain concept)

Code is organised into vertical slices, each owning everything related to one domain concept.

```
feature-first/
  auth/
    auth.js             Authentication & authorisation
  products/
    products-store.js   In-memory product store
    index.js            Barrel - public API for this feature
  orders/
    orders-store.js     In-memory order store
    orders-service.js   Ordering business logic
    index.js            Barrel - public API for this feature
  run.js                Entry point - imports from barrel files
```

## Dependency rule

```
Cross-feature imports go through the barrel index.js ONLY.
```

`orders/orders-service.js` needs products - it imports from `products/index.js`, never from `products/products-store.js` directly. This keeps each feature's internals private and refactorable.

## Pros

- **Feature work stays in one folder** - adding "returns" means creating `returns/` with its own store, service, and barrel.
- **Team-friendly** - different developers or teams can own different feature folders with minimal merge conflicts.
- **Scales naturally** - the project grows by adding folders, not by making existing folders wider.

## Cons

- **Shared utilities need a home** - cross-cutting code (logging, config, error types) doesn't belong to any one feature. A `shared/` or `common/` folder often emerges.
- **Barrel discipline required** - if developers bypass `index.js` and import internals directly, the boundary erodes silently.
- **Circular dependencies** can appear when two features need each other. The fix is usually to extract the shared concept into its own feature.

## When to use

Medium-to-large projects with multiple domain concepts, especially when more than one person or team contributes. This is the default recommendation for most Node.js APIs and web applications.
