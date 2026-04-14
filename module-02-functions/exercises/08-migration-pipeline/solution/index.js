export function filterHighRiskZones(events) {
  return events.filter((e) => e.risk === 'high' && e.headcount > 0);
}

export function toLogLines(events) {
  return events.map((e) => `${e.zone}: ${e.headcount} animals`);
}

export function countByZone(events) {
  return events.reduce((acc, e) => {
    acc[e.zone] = (acc[e.zone] ?? 0) + e.headcount;
    return acc;
  }, {});
}

export function buildMigrationReport(events) {
  const filtered = filterHighRiskZones(events);
  return {
    lines: toLogLines(filtered),
    totals: countByZone(filtered),
  };
}
