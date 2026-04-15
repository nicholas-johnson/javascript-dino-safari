/**
 * Feature-first approach - code grouped by domain concept.
 *
 * auth/       Authentication & authorisation (self-contained)
 * products/   Catalogue: store + public API via index.js
 * orders/     Ordering: store + service + public API via index.js
 *
 * Each feature folder owns its data, logic, and public surface.
 * Cross-feature imports go through the index.js barrel file only.
 */

import * as auth from './auth/auth.js';
import { listProducts } from './products/index.js';
import { placeOrder, getUserOrders } from './orders/index.js';

export function run() {
  const user = auth.authenticate('tok-admin-alice');
  auth.authorize(user, 'admin');

  const catalogue = listProducts();
  console.log(`  Catalogue: ${catalogue.length} products`);

  const order = placeOrder(user.id, 'P-001', 2);
  console.log(
    `  Placed order ${order.id}: ${order.quantity}× P-001 = $${(order.totalCents / 100).toFixed(2)}`,
  );

  const mine = getUserOrders(user.id);
  console.log(`  Alice's orders: ${mine.length}`);

  try {
    auth.authenticate('bad-token');
  } catch (e) {
    console.log(`  Auth rejected bad token ✓`);
  }
}
