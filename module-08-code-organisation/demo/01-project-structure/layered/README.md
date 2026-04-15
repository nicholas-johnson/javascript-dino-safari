# Approach 1 - Layered (group by technical role)

Code is organised into horizontal layers, each with a single technical responsibility.

```
layered/
  models/
    product.js          Data shape for a product
    order.js            Data shape + factory for an order
  repositories/
    products-repo.js    In-memory product store
    orders-repo.js      In-memory order store
  services/
    auth-service.js     Token authentication & role checks
    product-service.js  Catalogue business logic
    order-service.js    Ordering business logic
  run.js                Entry point - imports services only
```

## Dependency rule

```
services  →  repositories  →  models
```

A layer may only import from the layer directly below it. Services never import other services' internals - they go through the public functions.

## Pros

- **Easy to understand** - new developers know exactly where to look for "data shapes" vs "business logic" vs "persistence".
- **Enforces separation of concerns** - mixing persistence into a service is an obvious rule violation.
- **Works well for small-to-medium projects** where the domain is not complex enough to warrant feature boundaries.

## Cons

- **Feature work is scattered** - adding a "returns" feature means touching `models/`, `repositories/`, and `services/` all at once.
- **Layers grow wide** - as the project scales, each layer folder accumulates dozens of files with no further grouping.
- **Cross-cutting concerns** (logging, validation) don't fit neatly into a single layer.

## When to use

Small services, utilities, CLIs, or early-stage APIs where the domain has fewer than ~5 distinct concepts and one team owns the whole codebase.
