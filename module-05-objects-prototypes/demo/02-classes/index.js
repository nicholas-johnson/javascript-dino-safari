// 02-classes - the same prototype chain from demo 01, rewritten with class syntax

class Dinosaur {
  constructor(name, species, zone) {
    this.name = name;
    this.species = species;
    this.zone = zone;
  }

  describe() {
    return `${this.name} - ${this.species} @ ${this.zone}`;
  }
}

class FlyingDinosaur extends Dinosaur {
  constructor(name, species, zone, wingspanM) {
    super(name, species, zone);
    this.wingspanM = wingspanM;
  }

  describe() {
    return `${super.describe()} - wingspan ${this.wingspanM}m`;
  }

  takeOff() {
    return `${this.name} spreads ${this.wingspanM}m wings and lifts off`;
  }
}

const rex = new Dinosaur('Rex', 'Tyrannosaurus', 'Cretaceous Valley');
const ptera = new FlyingDinosaur('Skyler', 'Pteranodon', 'Aviary Ridge', 6);

console.log('\n--- class syntax (sugar over prototypes) ---\n');
console.log(rex.describe());
console.log(ptera.describe());
console.log(ptera.takeOff());

console.log('\n--- Still the same prototype chain underneath ---\n');
console.log('ptera instanceof FlyingDinosaur:', ptera instanceof FlyingDinosaur);
console.log('ptera instanceof Dinosaur:      ', ptera instanceof Dinosaur);
console.log(
  'typeof Dinosaur:                ',
  typeof Dinosaur,
  '(classes are functions)',
);

// Getters - computed properties that look like data access
class Paddock {
  #residents = [];

  add(dino) {
    this.#residents.push(dino);
  }

  get headcount() {
    return this.#residents.length;
  }

  get isEmpty() {
    return this.#residents.length === 0;
  }
}

const paddock = new Paddock();
console.log('\n--- Getters ---\n');
console.log('isEmpty:', paddock.isEmpty);
paddock.add(rex);
paddock.add(ptera);
console.log('headcount:', paddock.headcount);

// Static methods - utility that belongs to the class, not an instance
class DinoUtils {
  static isDangerous(dino) {
    const carnivores = ['Tyrannosaurus', 'Velociraptor', 'Allosaurus'];
    return carnivores.includes(dino.species);
  }
}

console.log('\n--- Static methods ---\n');
console.log('Rex dangerous?  ', DinoUtils.isDangerous(rex));
console.log('Skyler dangerous?', DinoUtils.isDangerous(ptera));
