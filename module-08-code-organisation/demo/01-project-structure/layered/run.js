/**
 * Layered approach - code grouped by technical role.
 *
 * models/        Data shapes
 * repositories/  Persistence (in-memory here)
 * services/      Business logic
 *
 * Dependency rule: services → repositories → models (never the reverse).
 */

import * as auth from './services/auth-service.js';
import * as products from './services/product-service.js';
import * as orders from './services/order-service.js';

export function run() {
  const user = auth.authenticate('tok-admin-alice');
  auth.authorize(user, 'admin');

  const catalogue = products.listProducts();
  console.log(`  Catalogue: ${catalogue.length} products`);

  const order = orders.placeOrder(user.id, 'P-001', 2);
  console.log(
    `  Placed order ${order.id}: ${order.quantity}× P-001 = $${(order.totalCents / 100).toFixed(2)}`,
  );

  const mine = orders.getUserOrders(user.id);
  console.log(`  Alice's orders: ${mine.length}`);

  try {
    auth.authenticate('bad-token');
  } catch (e) {
    console.log(`  Auth rejected bad token ✓`);
  }
}
