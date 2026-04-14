/**
 * Demo: constructors + prototype chain (no class syntax).
 */
function Dinosaur(species, diet) {
  this.species = species;
  this.diet = diet;
}

Dinosaur.prototype.describe = function describe() {
  return `${this.species} (${this.diet})`;
};

function Theropod(species, lengthM) {
  Dinosaur.call(this, species, 'carnivore');
  this.lengthM = lengthM;
}

Theropod.prototype = Object.create(Dinosaur.prototype);
Theropod.prototype.constructor = Theropod;
Theropod.prototype.huntSummary = function huntSummary() {
  return `${this.describe()} - ${this.lengthM}m apex`;
};

const rex = new Theropod('Tyrannosaurus', 12);

console.log('\n--- Prototype chain demo ---');
console.log(rex.huntSummary());
console.log('rex instanceof Theropod:', rex instanceof Theropod);
console.log('rex instanceof Dinosaur:', rex instanceof Dinosaur);
console.log('Chain:', Object.getPrototypeOf(rex) === Theropod.prototype);
