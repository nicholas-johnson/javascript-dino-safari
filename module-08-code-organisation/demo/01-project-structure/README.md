# Demo: Project Structure - Three Approaches

The same **inventory tracking API** (products, orders, auth) implemented three different ways. Each approach lives in its own folder and produces identical output - the difference is how the code is organised.

## Run it

```bash
node module-08-code-organisation/demo/01-project-structure
```

This runs all three approaches back-to-back so you can compare the output.

## The approaches

| Folder                                 | Strategy                             | Key idea                                                          |
| -------------------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| [`layered/`](./layered/)               | Group by technical role              | `models → repositories → services` - strict downward dependency   |
| [`feature-first/`](./feature-first/)   | Group by domain concept              | Each feature owns its data, logic, and public surface             |
| [`facade-modules/`](./facade-modules/) | Factory functions + composition root | Modules export factories; a single file wires everything together |

## Shared data

`data.js` provides the seed products and users that all three approaches consume. In a real project this would be a database - here it's a plain array so the demo stays self-contained.

## What to look for

1. **Where do you go to add a feature?** In layered you touch every layer. In feature-first you work inside one folder. In facade-modules you build a new factory and wire it in.
2. **How do modules depend on each other?** Layered uses a strict top-down rule. Feature-first uses barrel `index.js` files as boundaries. Facade-modules uses dependency injection - no module imports another directly.
3. **What's the trade-off?** Each README inside the approach folder spells out the pros, cons, and when the approach shines.
