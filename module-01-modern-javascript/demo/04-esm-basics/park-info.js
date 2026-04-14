/**
 * A small module that exports park constants and a helper function.
 * Imported by index.js in this same demo folder.
 */

export const PARK_NAME = 'Dinosaur Safari Research Park';
export const SECTOR_COUNT = 6;

export function formatWelcome(rangerName) {
  return `Welcome to ${PARK_NAME}, Ranger ${rangerName}. ${SECTOR_COUNT} sectors online.`;
}

export default function printStatus() {
  console.log(`[${PARK_NAME}] All systems operational.`);
}
