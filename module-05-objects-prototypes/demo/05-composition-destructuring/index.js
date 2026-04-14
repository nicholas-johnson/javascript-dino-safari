/**
 * Demo (composition + destructuring): same “mixin + spread” idea as 03, plus
 * destructuring for arguments, renaming, defaults, and pulling fields from the
 * composed result.
 */
const withCallsign = (state) => ({
  identify() {
    return `${state.callsign} - ${state.name}`;
  },
});

const withPatrol = (state) => ({
  patrolReport() {
    return `${state.name} covering ${state.zone}`;
  },
});

// Factory argument is destructured: callers pass an object shape you document.
function createRanger({ name, callsign, zone }) {
  const state = { name, callsign, zone };
  return {
    ...state,
    ...withCallsign(state),
    ...withPatrol(state),
  };
}

const ellie = createRanger({
  name: 'Ellie Sattler',
  callsign: 'R-NORTH',
  zone: 'Triceratops paddock',
});

console.log('\n--- Composed ranger ---');
console.log(ellie.identify());
console.log(ellie.patrolReport());

// Pull a few properties from the composed object (data + methods live together).
const { name, zone } = ellie;
console.log('\n--- Destructuring from composed object ---');
console.log('Log line:', `${name} last seen at ${zone}`);

// Rename while destructuring
const { callsign: radioId } = ellie;
console.log('Radio:', radioId);

// Defaults when reading a partial patch (common with API / env-style objects)
const telemetryPatch = { heartRate: 82 };
const { heartRate, stress = 'nominal' } = telemetryPatch;
console.log('\n--- Defaults in destructuring ---');
console.log({ heartRate, stress });

// Nested destructuring (one level is enough for class demos)
const briefing = {
  lead: { name: 'Malcolm', role: 'chaotician' },
  site: 'Isla Nublar',
};
const {
  lead: { name: leadName, role },
  site,
} = briefing;
console.log('\n--- Nested destructuring ---');
console.log(`${leadName} (${role}) - ${site}`);
