/**
 * Demo: this in methods, lost in callbacks, bind vs arrow.
 */
const ranger = {
  callsign: 'Ranger-Kai',
  zones: ['Raptor Ridge'],

  announce() {
    console.log(`${this.callsign} on channel - zones: ${this.zones.join(', ')}`);
  },

  brokenPatrol() {
    setTimeout(function () {
      // `this` is not ranger here (strict: undefined; sloppy: global)
      console.log('\n--- brokenPatrol (function callback) ---');
      try {
        console.log('callsign via this:', this?.callsign);
      } catch {
        console.log('this is undefined in strict mode');
      }
    }, 10);
  },

  fixedPatrolArrow() {
    setTimeout(() => {
      console.log('\n--- fixedPatrolArrow ---');
      console.log('callsign via arrow lexical this:', this.callsign);
    }, 20);
  },

  fixedPatrolBind() {
    setTimeout(
      function () {
        console.log('\n--- fixedPatrolBind ---');
        console.log('callsign via bind:', this.callsign);
      }.bind(this),
      30,
    );
  },
};

ranger.announce();
ranger.brokenPatrol();
ranger.fixedPatrolArrow();
ranger.fixedPatrolBind();
