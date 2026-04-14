/**
 * Demo (simple composition): merge small capability objects with spread instead
 * of subclassing. See 05-composition-destructuring.js for destructuring patterns.
 */
const canRoar = (state) => ({
  roar() {
    return `${state.name} ROARS (${state.volume}dB)`;
  },
});

const canFly = (state) => ({
  fly() {
    return `${state.name} lifts off - wingspan ${state.wingspanM}m`;
  },
});

function createPterosaur(name) {
  const state = { name, wingspanM: 6, volume: 110 };
  return {
    ...state,
    ...canRoar(state),
    ...canFly(state),
  };
}

const skyler = createPterosaur('Skyler');
console.log('\n--- Simple composition (spread + mixins) ---');
console.log(skyler.roar());
console.log(skyler.fly());
