export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 8 - Code Organisation',
      subtitle: 'Expanding the park without losing the map',
      icon: 'folder-tree',
    },
  },
  {
    type: 'standard',
    content: {
      title: 'What we will cover',
      icon: 'list',
      points: [
        '**Project structure** - layered vs feature-first layouts and when each works best.',
        '**Module contracts** - barrel files, one-way dependencies, and avoiding circular imports.',
        '**Errors, config, and logging** - custom error types, fail-fast validation, structured output.',
        '**Monorepos** - pnpm workspaces for multi-package repos, Nx for scale.',
      ],
    },
  },

  // ── Project structure deep-dive ─────────────────────────────

  // ── Approach 1: Layered ────────────────────────────────────

  {
    type: 'standard',
    content: {
      title: 'Approach 1 - Layered',
      icon: 'layers',
      points: [
        'Group files by **technical role**: models, repositories, services.',
        'Strict dependency rule: `services → repositories → models` (never reverse).',
        'Easy to understand - everyone knows where "business logic" lives.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Layered - directory tree',
      code: `layered/
  models/
    product.js          // data shape
    order.js            // data shape + factory
  repositories/
    products-repo.js    // in-memory store
    orders-repo.js      // in-memory store
  services/
    auth-service.js     // token auth & role checks
    product-service.js  // catalogue logic
    order-service.js    // ordering logic
  run.js                // entry point - imports services only`,
      highlights: [
        'Each layer has one job - mixing persistence into a service breaks the rule',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Layered - entry point',
      code: `import * as auth from './services/auth-service.js';
import * as products from './services/product-service.js';
import * as orders from './services/order-service.js';

const user = auth.authenticate('tok-admin-alice');
auth.authorize(user, 'admin');

const catalogue = products.listProducts();
const order = orders.placeOrder(user.id, 'P-001', 2);`,
      highlights: [
        'Entry point only touches the services layer - never reaches into repos or models directly',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Layered - trade-offs',
      icon: 'scale',
      points: [
        '**Pro:** Clear separation of concerns - new devs find things fast.',
        '**Pro:** Works well for small-to-medium projects with one team.',
        '**Con:** Adding a feature (e.g. "returns") means touching *every* layer.',
        '**Con:** Layers grow wide - dozens of files per folder with no sub-grouping.',
      ],
    },
  },

  // ── Approach 2: Feature-first ──────────────────────────────

  {
    type: 'standard',
    content: {
      title: 'Approach 2 - Feature-first',
      icon: 'grid',
      points: [
        'Group files by **domain concept**: auth, products, orders.',
        'Each feature folder owns its data, logic, and public surface.',
        'Cross-feature imports go through a barrel `index.js` only.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Feature-first - directory tree',
      code: `feature-first/
  auth/
    auth.js             // authenticate + authorize
  products/
    products-store.js   // in-memory store
    index.js            // barrel - public API
  orders/
    orders-store.js     // in-memory store
    orders-service.js   // business logic
    index.js            // barrel - public API
  run.js                // entry point`,
      highlights: [
        'Each folder is a self-contained vertical slice - add a feature by adding a folder',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Feature-first - entry point',
      code: `import * as auth from './auth/auth.js';
import { listProducts } from './products/index.js';
import { placeOrder, getUserOrders } from './orders/index.js';

const user = auth.authenticate('tok-admin-alice');
auth.authorize(user, 'admin');

const catalogue = listProducts();
const order = placeOrder(user.id, 'P-001', 2);`,
      highlights: [
        'Imports go through barrel files - each feature controls what it exposes',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Feature-first - trade-offs',
      icon: 'scale',
      points: [
        '**Pro:** Feature work stays in one folder - fewer merge conflicts.',
        '**Pro:** Scales naturally - the project grows by *adding* folders, not widening them.',
        '**Con:** Shared utilities need a `shared/` home that everyone agrees on.',
        '**Con:** Barrel discipline required - bypassing `index.js` silently erodes boundaries.',
      ],
    },
  },

  // ── Comparison ─────────────────────────────────────────────

  {
    type: 'comparison',
    content: {
      title: 'Layered vs feature-first',
      left: {
        label: 'Layered',
        items: [
          'Horizontal slices by technical role',
          'Adding a feature touches every layer',
          'Best for small projects, one team',
        ],
      },
      right: {
        label: 'Feature-first',
        items: [
          'Vertical slices by domain concept',
          'Adding a feature = adding a folder',
          'Best for larger projects, multiple teams',
        ],
      },
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Choosing an approach',
      icon: 'compass',
      points: [
        '**Small CLI / utility?** Layered is straightforward and sufficient.',
        '**Growing API with 5+ domain concepts?** Feature-first keeps things manageable.',
        'Most real projects settle on feature-first as they grow.',
      ],
    },
  },

  // ── Wider concerns ─────────────────────────────────────────

  {
    type: 'standard',
    content: {
      title: 'Designing module APIs',
      icon: 'link',
      points: [
        'Export narrow surfaces from `index.js`.',
        "Depend inward: features may use `shared/`, not each other's internals.",
        'Avoid circular imports - they bite at runtime in subtle ways.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Config at the root',
      icon: 'settings',
      points: [
        'Load all config **once** in your entry point - not scattered across modules.',
        'Pass config down as plain objects: `createServer(config)`, not `process.env` everywhere.',
        'Linting, formatting, TypeScript, test runners - keep their config files at the project root.',
        'One place to look, one place to change. New teammates find settings in seconds.',
      ],
    },
  },

  {
    type: 'standard',
    content: {
      title: 'Monorepos with pnpm workspaces',
      icon: 'package',
      points: [
        'One repo, many packages - each with its own `package.json` and dependencies.',
        '`pnpm-workspace.yaml` declares which folders are packages (e.g. `packages/*`).',
        'Shared deps are hoisted; per-package deps stay isolated - no phantom imports.',
        '`pnpm --filter <pkg> test` runs commands in a single package; `pnpm -r test` runs everywhere.',
        'This course repo is a monorepo - shared tooling at the root, independent modules inside.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Nx - monorepo tooling at scale',
      icon: 'zap',
      points: [
        '**Nx** layers on top of pnpm workspaces with caching, task orchestration, and dependency graphs.',
        '`nx affected` only runs tests/builds for packages touched by your changes - huge CI speedup.',
        "Computation caching: if the inputs haven't changed, Nx replays the output instantly.",
        'Built-in generators scaffold new packages, libraries, and features with consistent structure.',
        'Worth adopting when your monorepo has 10+ packages and CI times start to hurt.',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Park expansion ready - Module 8',
      subtitle: 'Ship structure, not chaos',
      icon: 'award',
    },
  },
];
