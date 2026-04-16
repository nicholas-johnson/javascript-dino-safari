import { processAlerts } from './pipeline/index.js';

const raw = [
  { zone: ' North Ridge ', level: 5, timestamp: 1000 },
  { zone: 'North Ridge', level: 5, timestamp: 1000 }, // duplicate
  { zone: 'south-valley', level: 2, timestamp: 2000 },
  { zone: 'East Wing', level: 1, timestamp: 3000 },
  { zone: '', level: 3, timestamp: 4000 }, // invalid
  { zone: 'West Gate', level: 4, timestamp: 5000 },
];

const result = processAlerts(raw);
console.log(`Processed ${result.total} unique alerts`);
console.log('Critical:', result.critical);
console.log('Warning:', result.warning);
console.log('Info:', result.info);
