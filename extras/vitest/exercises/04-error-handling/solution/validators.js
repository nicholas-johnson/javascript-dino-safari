export const safeDivide = (a, b) => {
  if (b === 0) throw new Error('Cannot divide by zero');
  return a / b;
};

export const parseJSON = (str) => {
  try {
    return JSON.parse(str);
  } catch {
    throw new Error('Invalid JSON');
  }
};

export const requirePositive = (n) => {
  if (typeof n !== 'number' || n <= 0) {
    throw new Error('Expected a positive number');
  }
  return n;
};

export const lookupById = (collection, id) => {
  const item = collection.find((entry) => entry.id === id);
  if (!item) throw new Error(`Not found: ${id}`);
  return item;
};

export const createUser = ({ name, email } = {}) => {
  if (!name) throw new Error('name is required');
  if (!email) throw new Error('email is required');
  return { name, email };
};
