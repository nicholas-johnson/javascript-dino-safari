/**
 * Facade modules with a composition root.
 *
 * lib/auth.js       Factory → returns an auth service object
 * lib/catalogue.js  Factory → returns a catalogue object
 * lib/orders.js     Factory → returns an order service object
 *
 * This file IS the composition root: it creates each service and
 * wires them together. No module imports another directly - all
 * dependencies are injected at construction time.
 */

import { products, users } from '../data.js';
import { createAuthService } from './lib/auth.js';
import { createCatalogue } from './lib/catalogue.js';
import { createOrderService } from './lib/orders.js';

export function run() {
  // --- composition root: build the object graph ---
  const auth = createAuthService(users);
  const catalogue = createCatalogue(products);
  const orders = createOrderService(catalogue); // injected dependency

  // --- use the wired-up system ---
  const user = auth.authenticate('tok-admin-alice');
  auth.authorize(user, 'admin');

  const list = catalogue.listProducts();
  console.log(`  Catalogue: ${list.length} products`);

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
