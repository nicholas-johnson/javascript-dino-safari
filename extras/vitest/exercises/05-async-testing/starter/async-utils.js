const USERS = {
  1: { id: 1, name: 'Ada' },
  2: { id: 2, name: 'Grace' },
  3: { id: 3, name: 'Alan' },
};

export const delay = (ms) =>
  new Promise((resolve) => setTimeout(() => resolve('done'), ms));

export const fetchUser = (id) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = USERS[id];
      if (user) resolve(user);
      else reject(new Error(`Unknown user: ${id}`));
    }, 10);
  });

export const fetchAll = (ids) => Promise.all(ids.map(fetchUser));

export const timeout = (promise, ms) =>
  Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Timeout')), ms)
    ),
  ]);

export const retry = async (fn, attempts) => {
  let lastError;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
    }
  }
  throw lastError;
};
