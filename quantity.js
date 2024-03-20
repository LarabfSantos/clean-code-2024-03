class Quantity {
  constructor(amount, unit) {
    this._amount = amount;
    this._unit = unit;
  }

  equals(other) {
    return (
      this._unit.isConvertable(other._unit) &&
      this._amount == this._unit.convertedAmount(other._amount, other._unit)
    );
  }

  add(other) {
    const convertedAmount = this._unit.convertedAmount(
      other._amount,
      other._unit
    );
    return new Quantity(this._amount + convertedAmount, this._unit);
  }
}

module.exports = { Quantity };
