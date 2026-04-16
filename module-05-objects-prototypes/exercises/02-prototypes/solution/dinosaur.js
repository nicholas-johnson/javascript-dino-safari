export class Dinosaur {
  constructor(name, species, zone) {
    this.name = name;
    this.species = species;
    this.zone = zone;
  }

  describe() {
    return `${this.name} - ${this.species} @ ${this.zone}`;
  }
}

export class FlyingDinosaur extends Dinosaur {
  constructor(name, species, zone, wingspanM) {
    super(name, species, zone);
    this.wingspanM = wingspanM;
  }

  describe() {
    return `${super.describe()} - wingspan ${this.wingspanM}m`;
  }
}
