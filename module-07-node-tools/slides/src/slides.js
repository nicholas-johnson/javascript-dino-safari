export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 7 - Node.js Tools',
      subtitle: 'Park operations: files, HTTP, streams',
      icon: 'wrench',
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'HQ runs on logs and APIs',
      points: [
        'Filesystem + `path` for durable sighting records.',
        '`http.createServer` for tiny JSON services - no framework required.',
        'Streams keep memory flat when CSVs grow to thunder lizard size.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'fs/promises + path',
      icon: 'folder-plus',
      points: [
        '`readFile`, `writeFile`, `appendFile`, `mkdir({ recursive: true })`.',
        '`path.join` - never hand-concatenate slashes for cross-platform.',
        '`fileURLToPath(import.meta.url)` for ESM-friendly `__dirname`.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Append NDJSON sightings',
      code: `import { appendFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

await mkdir(path.dirname(file), { recursive: true });
await appendFile(file, JSON.stringify(row) + '\\n');`,
      highlights: ['One JSON object per line - easy to stream later'],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'process.env & argv',
      icon: 'settings',
      points: [
        'Configuration from environment - twelve-factor style.',
        '`process.argv` for CLI tools and workshop scripts.',
        'Validate env early; fail loud at boot, not deep in a handler.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'HTTP JSON API shape',
      icon: 'globe',
      points: [
        'Set `Content-Type: application/json`.',
        'Use meaningful status codes: 200, 201, 400, 404, 500.',
        'Parse bodies carefully - malformed JSON is a 400, not a 500.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Minimal route split',
      code: `const url = new URL(req.url, 'http://127.0.0.1');
if (req.method === 'GET' && url.pathname === '/dinosaurs') {
  // ...
}`,
      highlights: [
        'For class: graduate to a router; for learning: explicit branches are fine',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Streams & backpressure',
      icon: 'waves',
      points: [
        '`createReadStream` / `createWriteStream` - chunk by chunk.',
        '`pipeline` forwards errors and cleans up; prefer over manual `.pipe`.',
        'Backpressure: consumers can slow producers - avoids loading whole savannah into RAM.',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Buffer file vs stream',
      left: {
        label: 'readFile whole',
        items: ['Simple for small files', 'Memory spike on multi-GB logs'],
      },
      right: {
        label: 'stream + readline/transform',
        items: ['Constant memory', 'More moving parts - worth it at scale'],
      },
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 7',
      rules: [
        {
          rule: 'Always join paths',
          example: 'Windows vs POSIX - `path.join` saves rangers.',
          icon: 'map',
        },
        {
          rule: 'Close / pipeline resources',
          example: 'Handle errors; do not leak handles on rejections.',
          icon: 'plug',
        },
        {
          rule: 'JSON errors are client errors',
          example: '400 + `{ error }` body - predictable for dashboards.',
          icon: 'alert-triangle',
        },
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Exercises - operations desk',
      points: [
        '01 - Sighting logger (fs/promises)',
        '02 - Dino HTTP JSON API',
        '03 - Stream filter dangerous CSV rows',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Operations center - Module 7',
      subtitle: 'Run Node demos, then exercises under module-07-node-tools',
      icon: 'rocket',
    },
  },
];
