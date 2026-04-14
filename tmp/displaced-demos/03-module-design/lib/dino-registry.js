/** Internal - not exported; demo shows hiding details behind a facade */
const _byId = new Map();

export function registerDino(record) {
  if (!record?.trackingId) throw new Error('trackingId required');
  _byId.set(record.trackingId, { ...record });
}

export function getDino(trackingId) {
  return _byId.get(trackingId) ?? null;
}

export function listIds() {
  return [..._byId.keys()];
}
