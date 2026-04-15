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
    type: 'welcome',
    content: {
      title: 'More rangers, more code paths',
      points: [
        'Structure by feature vs by layer - both can work; pick intentionally.',
        'Module contracts beat "import whatever you see".',
        'Errors, config, and logging need owners - not sprawl.',
      ],
    },
  },

  // ── Project structure deep-dive ─────────────────────────────

  {
    type: 'standard',
    content: {
      title: 'The scenario',
      icon: 'package',
      points: [
        'An **inventory tracking API** - products, orders, auth.',
        'Same features, same behaviour - three different file layouts.',
        'Run the demo: `node module-08-code-organisation/demo/01-project-structure`',
      ],
    },
  },

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

  // ── Approach 3: Facade modules ─────────────────────────────

  {
    type: 'standard',
    content: {
      title: 'Approach 3 - Facade modules',
      icon: 'zap',
      points: [
        'Each module is a **factory function** that receives dependencies as arguments.',
        'A single **composition root** creates every service and wires them together.',
        'No `lib/` module imports another - all coupling is explicit.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Facade modules - directory tree',
      code: `facade-modules/
  lib/
    auth.js         // createAuthService(users) → { authenticate, authorize }
    catalogue.js    // createCatalogue(products) → { listProducts, getProduct }
    orders.js       // createOrderService(catalogue) → { placeOrder, ... }
  run.js            // composition root - builds the object graph`,
      highlights: [
        'Factories declare what they *need* - the composition root provides it',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Facade modules - composition root',
      code: `import { createAuthService } from './lib/auth.js';
import { createCatalogue } from './lib/catalogue.js';
import { createOrderService } from './lib/orders.js';

// build the object graph
const auth = createAuthService(users);
const catalogue = createCatalogue(products);
const orders = createOrderService(catalogue); // injected

const user = auth.authenticate('tok-admin-alice');
const order = orders.placeOrder(user.id, 'P-001', 2);`,
      highlights: [
        '`orders` receives `catalogue` at construction - no hidden imports',
        'Swap any dependency for a test stub by passing a fake into the factory',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Facade modules - trade-offs',
      icon: 'scale',
      points: [
        '**Pro:** Highly testable - swap any dependency for a stub, no mocking library needed.',
        '**Pro:** Explicit wiring - the composition root *is* the dependency graph.',
        '**Con:** More boilerplate - every module needs a factory wrapper.',
        '**Con:** Overkill for small projects with 2\u20133 modules and no tests.',
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
        '**Library or plugin system?** Facade modules give you testability and swappability.',
        'You can *combine* - feature-first folders with facade wiring inside each feature.',
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
        'Export narrow surfaces from `index.js` facades.',
        "Depend inward: features may use `shared/`, not each other's internals.",
        'Avoid circular imports - they bite at runtime in subtle ways.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Errors as types',
      icon: 'alert-circle',
      points: [
        'Subclass `Error` with `code` for programmatic handling.',
        'Map known failures to HTTP/status in one place.',
        'Never swallow errors - log context, then fail closed.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Config sketch',
      code: `export function loadConfig(env) {
  const name = env.PARK_NAME?.trim();
  if (!name) throw new AppError('CONFIG_MISSING', 'PARK_NAME');
  return { parkName: name, port: Number(env.API_PORT ?? '8080') };
}`,
      highlights: ['Validate once at startup - not per request'],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Logging boundaries',
      icon: 'file-text',
      points: [
        'Structured lines: level, message, key=value context.',
        'Libraries log at borders; domain code returns results.',
        'Correlate with request ids in multi-service parks (future you says thanks).',
      ],
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 8',
      rules: [
        {
          rule: 'One composition root',
          example: '`cli.js` or `server.js` wires modules - not scattered.',
          icon: 'template',
        },
        {
          rule: 'Document where things live',
          example: 'README + folder conventions beat oral folklore.',
          icon: 'book-open',
        },
        {
          rule: 'Refactor in small steps',
          example: 'Tests green after each move - spaghetti exercise pattern.',
          icon: 'refresh',
        },
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Exercises - HQ architecture',
      points: [
        '01 - Refactor spaghetti digest into modules',
        '02 - AppError + env config + formatLogLine',
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
