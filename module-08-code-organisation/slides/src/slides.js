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
        'Module contracts beat “import whatever you see”.',
        'Errors, config, and logging need owners - not sprawl.',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Feature folders vs layers',
      left: {
        label: 'Feature-first',
        items: [
          '`tracking/`, `reporting/` - vertical slices',
          'Easier ownership per squad',
        ],
      },
      right: {
        label: 'Layered',
        items: [
          '`services/`, `repos/`, `ui/` - horizontal slices',
          'Can blur when features explode',
        ],
      },
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Monorepo touchpoint',
      icon: 'package',
      points: [
        'pnpm workspaces share tooling; packages publish boundaries.',
        'Shared `eslint` / `prettier` at root - consistent guardrails.',
        'Internal packages: `@dino-safari/...` naming clarity.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Designing module APIs',
      icon: 'link',
      points: [
        'Export narrow surfaces from `index.js` facades.',
        'Depend inward: features may use `shared/`, not each other’s internals.',
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
