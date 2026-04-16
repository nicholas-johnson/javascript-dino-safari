import http from 'node:http';

/**
 * @param {{ dinosaurs: { trackingId: string }[] }} opts
 */
export function createDinoApiServer(_opts) {
  // TODO
  return http.createServer((_req, res) => {
    res.writeHead(500);
    res.end('TODO');
  });
}
