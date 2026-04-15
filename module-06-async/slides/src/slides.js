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
    type: 'standard',
    content: {
      title: 'Learning objectives',
      icon: 'target',
      points: [
        'Chain promises and centralise errors with `try`/`catch` + `async`/`await`.',
        'Use `Promise.all`, `allSettled`, and `race` for realistic concurrency.',
        'Model timeouts and cancellation with `AbortController` and `AbortSignal`.',
        'Picture the event loop: microtasks vs macrotasks, and why order matters.',
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
      title: 'Promise basics',
      code: `const ping = new Promise((resolve, reject) => {
  setTimeout(() => resolve({ zone: 'North', status: 'ok' }), 500);
});

ping
  .then(data => console.log('Zone:', data.zone))
  .catch(err => console.error('Sensor failed:', err));`,
      highlights: [
        'The executor runs immediately - `resolve` or `reject` settle the promise once',
        '`.then` runs on success, `.catch` on failure - always handle both',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'async / await',
      icon: 'pause',
      points: [
        '`async` marks a function as returning a Promise - even if you just return a value.',
        '`await` pauses *that function* until the Promise settles - the event loop keeps running.',
        'Error handling reads like synchronous code: `try`/`catch` instead of `.catch()` chains.',
        'Any function that calls `await` must be `async` - it propagates up the call stack.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'async / await in action',
      code: `async function pingZone(id) {
  try {
    const res = await fetch(\`/api/zones/\${id}\`);
    const data = await res.json();
    console.log('Zone:', data.zone);
    return data;
  } catch (err) {
    console.error('Ping failed:', err.message);
  }
}

await pingZone('north');`,
      highlights: [
        'Each `await` pauses the function, not the whole thread',
        '`try`/`catch` replaces `.then`/`.catch` - same Promise underneath',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Promise concurrency methods',
      icon: 'layers',
      points: [
        '`Promise.all([ ])` - resolves when *every* promise fulfils; rejects on the *first* failure.',
        '`Promise.allSettled([ ])` - waits for all to finish; never rejects. Each result has `status`, `value` or `reason`.',
        '`Promise.race([ ])` - settles as soon as *any* promise settles (first wins, fulfilled or rejected).',
        '`Promise.any([ ])` - resolves with the *first fulfilment*; rejects only if *all* reject (`AggregateError`).',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Promise.all - all or nothing',
      code: `// simulate a sensor ping (resolves or rejects after a delay)
const pingZone = (id) =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({ zone: id, status: 'ok' }), 300)
  );

const [north, south] = await Promise.all([
  pingZone('north'),
  pingZone('south'),
]);
// Both resolved - use north & south
// If either rejects, the whole call rejects`,
      highlights: [
        'Runs promises in parallel - total time is the *slowest*, not the sum',
        'One rejection short-circuits: wrap in try/catch if partial results are OK',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Promise.allSettled - inspect every result',
      code: `const pingZone = (id) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (id === 'south' ? reject('offline') : resolve({ zone: id })),
      300
    )
  );

const results = await Promise.allSettled([
  pingZone('north'),
  pingZone('south'),   // this one rejects
  pingZone('east'),
]);

results.forEach(r => {
  if (r.status === 'fulfilled') console.log(r.value);
  else console.error('Failed:', r.reason);
});`,
      highlights: [
        'Never rejects - every result has `status` plus `value` or `reason`',
        'Perfect for dashboards: show green/red per zone',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Promise.race - first to settle wins',
      code: `const pingZone = (id, ms) =>
  new Promise(resolve =>
    setTimeout(() => resolve({ zone: id }), ms)
  );

const timeout = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timed out')), ms)
  );

const result = await Promise.race([
  pingZone('north', 200),   // resolves first => wins
  timeout(3000),             // never fires
]);`,
      highlights: [
        'First promise to settle (fulfilled *or* rejected) wins - the rest are ignored',
        'Classic timeout pattern: race the real work against a timer',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Promise.any - first to fulfil wins',
      code: `const pingZone = (id, ms, fail = false) =>
  new Promise((resolve, reject) =>
    setTimeout(
      () => (fail ? reject('offline') : resolve({ zone: id })),
      ms
    )
  );

const firstOk = await Promise.any([
  pingZone('north', 500),          // slow but works
  pingZone('south', 100, true),    // fast but fails - ignored
  pingZone('east', 200),           // fast, works => wins
]);`,
      highlights: [
        'Rejections are silently ignored - only fulfilments count',
        'If *all* reject, throws `AggregateError` containing every reason',
      ],
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
      title: 'The event loop - why it matters',
      icon: 'clock',
      points: [
        'JavaScript is *single-threaded* - only one piece of code runs at a time.',
        'So how does it handle thousands of concurrent requests? The *event loop*.',
        'The loop picks the next task, runs it to completion, then picks the next.',
        'Your code never runs *in parallel* - it runs *in turns*.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'One iteration of the loop',
      icon: 'repeat',
      points: [
        '1. Pick one *macrotask* from the queue (timer callback, I/O result, etc.).',
        '2. Run it to completion - no other JS can interrupt it.',
        '3. Drain *all* microtasks (`Promise.then` callbacks, `queueMicrotask`).',
        '4. Render (browser) / check for I/O (Node) - then repeat from step 1.',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Macrotasks vs microtasks',
      icon: 'layers',
      points: [
        '*Macrotasks*: `setTimeout`, `setInterval`, I/O callbacks, `setImmediate` (Node).',
        '*Microtasks*: `.then` / `.catch` / `.finally`, `await` continuations, `queueMicrotask`.',
        'Microtasks always run *before* the next macrotask - they jump the queue.',
        'That is why a resolved promise fires before a `setTimeout(…, 0)`.',
      ],
    },
  },
  {
    type: 'code',
    content: {
      title: 'Predict the output',
      code: `console.log('1 - synchronous');

setTimeout(() => console.log('2 - macrotask (timer)'), 0);

Promise.resolve()
  .then(() => console.log('3 - microtask (promise)'));

console.log('4 - synchronous');

// Output: 1, 4, 3, 2`,
      highlights: [
        'Synchronous code runs first (1, 4) - it is the *current* task',
        'Microtasks drain next (3) - before any timer fires',
        'The `setTimeout` callback (2) waits for the *next* macrotask turn',
      ],
    },
  },
  {
    type: 'standard',
    content: {
      title: 'Why this matters in practice',
      icon: 'alert-circle',
      points: [
        'A long synchronous function *blocks the entire loop* - no I/O, no timers, nothing.',
        '`await` yields control back to the loop - other work can run between awaits.',
        'Stacking microtasks endlessly (e.g. recursive `.then`) starves macrotasks - timers never fire.',
        'Rule of thumb: keep each turn of the loop *short*. Offload heavy work to workers or streams.',
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
