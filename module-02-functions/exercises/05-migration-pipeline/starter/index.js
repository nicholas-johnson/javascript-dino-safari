import { buildMigrationReport } from './pipeline.js';

const events = [
  { zone: 'north', headcount: 12, risk: 'high' },
  { zone: 'north', headcount: 3, risk: 'low' },
  { zone: 'south', headcount: 0, risk: 'high' },
  { zone: 'south', headcount: 5, risk: 'high' },
];

const report = buildMigrationReport(events);
console.log('Migration Report:');
console.log('Lines:', report.lines);
console.log('Totals:', report.totals);
