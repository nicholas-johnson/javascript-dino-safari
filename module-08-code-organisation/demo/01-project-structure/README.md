# Demo: Project Structure - Two Approaches

The same **inventory tracking API** (products, orders, auth) implemented two different ways. Each approach lives in its own folder and produces identical output - the difference is how the code is organised.

## Run it

```bash
node module-08-code-organisation/demo/01-project-structure
```

This runs both approaches back-to-back so you can compare the output.

## The approaches

| Folder                               | Strategy                | Key idea                                                        |
| ------------------------------------ | ----------------------- | --------------------------------------------------------------- |
| [`layered/`](./layered/)             | Group by technical role | `models → repositories → services` - strict downward dependency |
| [`feature-first/`](./feature-first/) | Group by domain concept | Each feature owns its data, logic, and public surface           |

## Shared data

`data.js` provides the seed products and users that both approaches consume. In a real project this would be a database - here it's a plain array so the demo stays self-contained.

## What to look for

1. **Where do you go to add a feature?** In layered you touch every layer. In feature-first you work inside one folder.
2. **How do modules depend on each other?** Layered uses a strict top-down rule. Feature-first uses barrel `index.js` files as boundaries.
3. **What's the trade-off?** Each README inside the approach folder spells out the pros, cons, and when the approach shines.
