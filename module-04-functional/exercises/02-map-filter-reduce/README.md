# Exercise - Migration pipeline

**Mission briefing:** Herd movements arrive as raw events. Build a **pure** pipeline: keep only high-risk zones, map to human-readable lines, then **reduce** to counts per zone.

## Tasks

Implement in [`start.js`](start.js):

Given events `{ zone: string, headcount: number, risk: 'low'|'high' }[]`:

1. **`filterHighRiskZones(events)`** - zones where `risk === 'high'` **and** `headcount > 0`.
2. **`toLogLines(events)`** - map each to `"<zone>: <headcount> animals"`.
3. **`countByZone(events)`** - sum `headcount` grouped by `zone` (object map).

Then implement **`buildMigrationReport(events)`** that composes the three steps:

- Filter high-risk
- Produce `{ lines: string[], totals: Record<string, number> }` where `lines` comes from `toLogLines` on the filtered list, and `totals` is `countByZone` on the **same** filtered list.

## Verify

```bash
pnpm vitest run module-04-functional/exercises/02-map-filter-reduce/start.test.js
```

Reference: [`solution.js`](solution.js).
