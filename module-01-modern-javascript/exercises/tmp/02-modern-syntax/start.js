/**
 * TODO: Refactor to modern syntax (see README). Keep exports and behaviour identical.
 */

export function summarizeForRadio(dino) {
  var name = dino && dino.name ? dino.name : 'Unknown asset';
  var species = dino && dino.species ? dino.species : 'unknown species';
  var zone = dino && dino.zone ? dino.zone : 'unassigned zone';
  var danger =
    dino && dino.dangerLevel !== undefined && dino.dangerLevel !== null
      ? dino.dangerLevel
      : 0;
  var last = dino && dino.lastSeen ? dino.lastSeen : 'no recent ping';
  return (
    'Ranger channel: ' +
    name +
    ' (' +
    species +
    ') in ' +
    zone +
    ' - risk ' +
    danger +
    ', last ' +
    last
  );
}

export function mergeRangerNotes(base, patch) {
  var out = {};
  for (var k in base) {
    if (Object.prototype.hasOwnProperty.call(base, k)) {
      out[k] = base[k];
    }
  }
  for (var j in patch) {
    if (Object.prototype.hasOwnProperty.call(patch, j)) {
      out[j] = patch[j];
    }
  }
  return out;
}
