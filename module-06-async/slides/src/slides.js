export const slides = [
  {
    type: 'title',
    content: {
      title: 'Module 6 - Async JavaScript',
      subtitle: 'Live tracking: promises, concurrency, cancellation',
      icon: 'timer',
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Pings arrive out of order',
      points: [
        'Some sensors resolve, some reject, some never answer.',
        'The event loop schedules work - microtasks vs macrotasks matter.',
        'AbortController lets rangers cancel a search mid-flight.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Promise fundamentals',
      icon: 'refresh',
      points: [
        'A Promise is a value that may arrive later: pending → fulfilled/rejected.',
        '`.then` chains transforms; `.catch` centralizes errors.',
        'Always end async chains with a handler - unhandled rejections crash trust.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'async / await = readable chains',
      code: `async function pingZone(id) {
  const res = await fetchZone(id);
  return normalize(res);
}`,
      highlights: [
        '`await` pauses the async function, not the whole thread',
        'Wrap risky blocks in try/catch like synchronous code',
      ],
    },
  },
  {
    type: 'comparison',
    content: {
      title: 'Promise.all vs allSettled',
      left: {
        label: 'Promise.all',
        items: [
          'Fails fast - one rejection rejects all',
          'Great when every sensor must succeed',
        ],
      },
      right: {
        label: 'Promise.allSettled',
        items: [
          'Wait for every attempt; inspect status per item',
          'Great for dashboards: show green/red per zone',
        ],
      },
    },
  },
  {
    type: 'standard',
    content: {
      title: 'race, timeouts, retries',
      icon: 'zap',
      points: [
        '`Promise.race` picks the first settled promise - classic timeout pattern.',
        'Retries: loop with backoff; cap attempts; surface the last error.',
        'Watch out for retry storms on a melting API.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Timeout wrapper sketch',
      code: `function withTimeout(p, ms) {
  return Promise.race([
    p,
    new Promise((_, rej) =>
      setTimeout(() => rej(new Error('timeout')), ms)),
  ]);
}`,
      highlights: ['Clear timers on success in production code to avoid leaks'],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'AbortController',
      icon: 'ban',
      points: [
        'Signal cancellation through `AbortSignal` - fetch and custom APIs.',
        'Listeners should stop work promptly when aborted.',
        'Great UX: user navigates away → cancel in-flight searches.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Event loop intuition',
      icon: 'clock',
      points: [
        'Macrotasks: timers, I/O callbacks.',
        'Microtasks: promise reactions, queueMicrotask - run before next render/timer.',
        '`process.nextTick` runs even earlier on Node - advanced edge cases.',
      ],
    },
  },
  {
    type: 'rules',
    content: {
      title: 'Field rules - Module 6',
      rules: [
        {
          rule: 'Handle or propagate rejections',
          example: 'Never fire-and-forget a promise in production.',
          icon: 'alert-circle',
        },
        {
          rule: 'Choose the right aggregator',
          example: 'all vs allSettled vs race - semantics differ.',
          icon: 'scale',
        },
        {
          rule: 'Model cancellation explicitly',
          example: 'AbortController beats “ignore the result”.',
          icon: 'stop',
        },
      ],
    },
  },
  {
    type: 'welcome',
    content: {
      title: 'Exercises - control room drills',
      points: [
        '01 - Retry + timeout around flaky pings',
        '02 - Batch sensors with allSettled',
        '03 - Cancellable search task',
      ],
    },
  },
  {
    type: 'title',
    content: {
      title: 'Network nominal - Module 6',
      subtitle: 'Run demos, then async exercises in module-06-async',
      icon: 'radio',
    },
  },
];
