import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const here = dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(readFileSync(join(here, 'package.json'), 'utf8'));

describe('02-package-scripts: package.json scripts', () => {
  it('defines start that runs tracker.js with node', () => {
    expect(pkg.scripts?.start).toMatch(/node(\.exe)?\s+.*tracker\.js/);
  });

  it('defines lint that targets tracker.js with eslint', () => {
    expect(pkg.scripts?.lint).toMatch(/eslint/);
    expect(pkg.scripts?.lint).toMatch(/tracker\.js/);
  });

  it('defines test script mentioning vitest (documentation for repo workflow)', () => {
    expect(pkg.scripts?.test).toMatch(/vitest/i);
  });
});
