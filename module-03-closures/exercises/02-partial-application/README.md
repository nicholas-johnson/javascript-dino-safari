# Exercise 02 - Partial application: alert channel

## The scenario

The Dino Safari control room is drowning in log noise. Every system - fences, feeders, motion sensors - pumps out messages, but operators need to see severity at a glance without repeating the severity label in every call site.

You'll use **partial application** to create lightweight, pre-configured alert functions. Each one "remembers" its severity so callers only have to supply the message. Then you'll layer on a second factory that tags alerts with a zone name, showing how partial application composes naturally.

## What you will build

### 1. `createAlertFn(severity)` - in [`starter/create-alert-fn.js`](starter/create-alert-fn.js)

Returns a function `alert(message)` that produces a formatted string:

```
[SEVERITY] message
```

For example:

```js
const warn = createAlertFn('WARN');
warn('Fence voltage dropping'); // "[WARN] Fence voltage dropping"

const crit = createAlertFn('CRITICAL');
crit('Perimeter breach'); // "[CRITICAL] Perimeter breach"
```

- The severity is baked in at creation time - callers never pass it again.
- The returned function **returns** a string (no `console.log` needed).

### 2. `createTaggedLogger(tag, baseAlertFn)` - in [`starter/create-tagged-logger.js`](starter/create-tagged-logger.js)

Takes a zone tag and an existing alert function (like one produced by `createAlertFn`), and returns a new function `log(message)` whose output is:

```
TAG: baseAlertFn(message)
```

For example:

```js
const crit = createAlertFn('CRITICAL');
const lagoon = createTaggedLogger('LAGOON', crit);
lagoon('breach'); // "LAGOON: [CRITICAL] breach"
```

This is partial application stacked two layers deep - the tag and the base function are both captured in the closure.

## Getting started

Open the two stub files in `starter/`. Each has the right signature and a placeholder return - fill in the body. Then run `starter/index.js` to see them in action:

```bash
node starter/index.js
```

## Verify

```bash
cd starter && pnpm install && pnpm test
```

The tests check formatting for `createAlertFn` and the composed output of `createTaggedLogger`.

## Hints

- The outer function receives config; the inner function receives the per-call data. That's the partial application pattern.
- Template literals make the formatting straightforward.

## Reference solution

[`solution/create-alert-fn.js`](solution/create-alert-fn.js) | [`solution/create-tagged-logger.js`](solution/create-tagged-logger.js)
