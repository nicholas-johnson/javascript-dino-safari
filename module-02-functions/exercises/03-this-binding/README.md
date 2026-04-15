# Exercise - Fix the `this` bugs in `SafariTour`

**Mission briefing:** The guided tour radio app loses track of the tour when callbacks fire. Repair it **without** changing the public method names on `SafariTour`.

## Tasks

Edit [`start.js`](start.js):

- `scheduleBriefing` uses `setTimeout` - the callback should announce the correct `title` and `guide`.
- `registerGuest` should push into **this** tour's `guests` array even when passed as a bare function (simulate `onClick={tour.registerGuest}` style).

You may use **arrow functions**, **`.bind`**, or **closures** - your choice.

## Verify

```bash
pnpm vitest run module-02-functions/exercises/03-this-binding/start.test.js
```

Reference: [`solution.js`](solution.js).
