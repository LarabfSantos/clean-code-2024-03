const { Quantity } = require("./quantity");

class Unit {
  constructor(relativeRatio = 1, relativeUnit) {
    if (relativeUnit) {
      this._ratioToBaseUnit = relativeRatio * relativeUnit._ratioToBaseUnit;
      this._baseUnit = relativeUnit._baseUnit;
    } else {
      this._ratioToBaseUnit = 1;
      this._baseUnit = this;
    }
  }

  s(amount) {
    return new Quantity(amount, this);
  }

  convertedAmount(otherAmount, otherUnit) {
    if (!this.isConvertable(otherUnit)) {
      throw new TypeError("Units are not compatible");
    }
    return (otherAmount * otherUnit._ratioToBaseUnit) / this._ratioToBaseUnit;
  }

  isConvertable(other) {
    return this._baseUnit === other._baseUnit;
  }
}

const TEASPOON = new Unit();
const TABLESPOON = new Unit(3, TEASPOON);
const OUNCE = new Unit(2, TABLESPOON);
const CUP = new Unit(8, OUNCE);
const PINT = new Unit(2, CUP);
const QUART = new Unit(2, PINT);
const GALLON = new Unit(4, QUART);

const INCH = new Unit();
const FEET = new Unit(12, INCH);
const YARD = new Unit(3, FEET);
const FURLONG = new Unit(220, YARD);
const MILE = new Unit(8, FURLONG);

// const MILLIMETRE = new Unit(1 / 25, INCH);
// const CENTIMETRE = new Unit(10, MILLIMETRE);
// const METRE = new Unit(100, CENTIMETRE);
// const KILOMETRE = new Unit(1000, METRE);

module.exports = {
  TEASPOON,
  TABLESPOON,
  OUNCE,
  CUP,
  PINT,
  QUART,
  GALLON,
  INCH,
  FEET,
  YARD,
  FURLONG,
  MILE,
};
