# Approach 3 - Facade modules with composition root

Each module is a factory function that receives its dependencies as arguments. A single "composition root" file creates every service and wires them together.

```
facade-modules/
  lib/
    auth.js             createAuthService(users) → { authenticate, authorize }
    catalogue.js        createCatalogue(seedProducts) → { listProducts, getProduct }
    orders.js           createOrderService(catalogue) → { placeOrder, getUserOrders }
  run.js                Composition root - builds and connects everything
```

## Dependency rule

```
No lib module imports another lib module.
All dependencies are passed in at construction time.
```

`orders.js` needs the catalogue - but it doesn't `import` it. Instead, `run.js` creates the catalogue first and passes it into `createOrderService(catalogue)`. The order module only knows about the _interface_ it receives, not where it came from.

## Pros

- **Highly testable** - swap any dependency for a stub by passing a fake into the factory. No mocking libraries needed.
- **Explicit dependency graph** - reading the composition root tells you exactly how the system is wired.
- **Easy to swap implementations** - want to replace the in-memory catalogue with a database-backed one? Write a new factory with the same interface and change one line in the composition root.

## Cons

- **More boilerplate** - every module needs a factory wrapper, and the composition root grows as the project grows.
- **Less obvious navigation** - jumping from usage to implementation requires going through the composition root rather than following an `import` path.
- **Overkill for small projects** - if you only have 2–3 modules and no tests, plain imports are simpler.

## When to use

Projects where testability and implementation-swapping matter: libraries, plugins, systems with multiple data backends, or any codebase with a thorough test suite that benefits from easy dependency injection.
