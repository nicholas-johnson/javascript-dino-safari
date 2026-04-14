export function Dinosaur(name, species, zone) {
  this.name = name;
  this.species = species;
  this.zone = zone;
}

Dinosaur.prototype.describe = function describe() {
  return `${this.name} - ${this.species} @ ${this.zone}`;
};

export function FlyingDinosaur(name, species, zone, wingspanM) {
  Dinosaur.call(this, name, species, zone);
  this.wingspanM = wingspanM;
}

FlyingDinosaur.prototype = Object.create(Dinosaur.prototype);
FlyingDinosaur.prototype.constructor = FlyingDinosaur;
FlyingDinosaur.prototype.describe = function describe() {
  return `${this.name} - ${this.species} @ ${this.zone} - wingspan ${this.wingspanM}m`;
};
