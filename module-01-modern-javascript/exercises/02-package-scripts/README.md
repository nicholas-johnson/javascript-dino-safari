# Exercise 02 - Package scripts at Base Camp

## The scenario

Every Node.js project has a `package.json` that acts as its command centre. Right now the park's tracker app can only be run by typing the full `node tracker.js` command - there's no standard way for another developer (or a CI pipeline) to start it, lint it, or run tests.

You'll wire up three npm scripts so the whole team can boot the tracker, check code quality, and run the test suite with short, memorable commands.

## What you will build

Edit [`starter/package.json`](starter/package.json) and add three entries to the `"scripts"` object:

| Script  | Command it should run                   | Purpose                                             |
| ------- | --------------------------------------- | --------------------------------------------------- |
| `start` | `node tracker.js`                       | Boot the tracker console                            |
| `lint`  | `eslint tracker.js`                     | Lint the tracker file with ESLint                   |
| `test`  | Any string containing the word `vitest` | Documents that this project uses Vitest for testing |

Once configured, anyone can run:

```bash
pnpm start    # boots the tracker
pnpm lint     # checks code quality
pnpm test     # runs tests
```

## Getting started

Open [`starter/package.json`](starter/package.json). You'll see an empty (or minimal) `"scripts"` section. Add the three entries described above. The values are plain strings - the command that npm/pnpm will execute.

## Verify

```bash
cd starter && pnpm install && pnpm start
```

You should see `DINO_SAFARI_TRACKER_ONLINE` printed to the console. Then run the tests:

```bash
pnpm test
```

## Hints

- Script values are just shell command strings, e.g. `"start": "node tracker.js"`.
- You can chain commands with `&&` if needed, but each script here only needs a single command.
- The `test` script just needs to contain the word `vitest` somewhere in the string - the tests check for that as documentation of the repo's test runner.

## Reference solution

[`solution/package.json`](solution/package.json)
