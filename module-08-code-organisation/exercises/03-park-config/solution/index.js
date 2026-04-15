import { loadConfig } from './config.js';
import { createLogger } from './logger.js';

const config = loadConfig({
  PARK_NAME: 'Dino Safari',
  API_PORT: '3000',
  LOG_LEVEL: 'info',
});
const log = createLogger(config);

log.info('Server starting', { port: config.apiPort });
log.debug('Debug message'); // null - below info level
log.warn('High traffic', { zone: 'north', load: '95%' });
log.error('Sensor offline', { sensor: 'T-001' });
