const { Quantity } = require("./quantity");
const {
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
} = require("./unit");

describe("Volume objects....", () => {
  test("are equal when quantity and units match", () => {
    expect(new Quantity(3, TEASPOON).equals(new Quantity(3, TEASPOON))).toBe(
      true
    );
    expect(new Quantity(4, TEASPOON).equals(new Quantity(5, TEASPOON))).toBe(
      false
    );
    expect(new Quantity(3, TEASPOON).equals(new Quantity(3, TABLESPOON))).toBe(
      false
    );
    expect(new Quantity(3, TABLESPOON).equals(new Quantity(3, TEASPOON))).toBe(
      false
    );
    expect(new Quantity(3, TABLESPOON).equals(new Quantity(3, TEASPOON))).toBe(
      false
    );

    expect(TEASPOON.s(3).equals(new Quantity(3, TEASPOON))).toBe(true);
    expect(TEASPOON.s(3).equals(TEASPOON.s(3))).toBe(true);
  });

  test("are equal when amounts are the same in the base unit", () => {
    expect(TABLESPOON.s(1).equals(TEASPOON.s(3))).toBe(true);
  });

  test("work for the examples given", () => {
    expect(TABLESPOON.s(1).equals(TEASPOON.s(3))).toBe(true);
    expect(OUNCE.s(1).equals(TABLESPOON.s(2))).toBe(true);
    expect(CUP.s(1).equals(OUNCE.s(8))).toBe(true);
    expect(PINT.s(1).equals(CUP.s(2))).toBe(true);
    expect(QUART.s(1).equals(PINT.s(2))).toBe(true);
    expect(GALLON.s(1).equals(QUART.s(4))).toBe(true);
  });

  test("random conversions", () => {
    expect(GALLON.s(1).equals(TEASPOON.s(4 * 2 * 2 * 8 * 2 * 3))).toBe(true);
    expect(TEASPOON.s(6).equals(OUNCE.s(1))).toBe(true);
  });

  test("adding quantities of the same unit", () => {
    expect(TEASPOON.s(1).add(TEASPOON.s(1))).toEqual(TEASPOON.s(2));
    expect(TEASPOON.s(5).add(TEASPOON.s(6))).toEqual(TEASPOON.s(11));
    expect(PINT.s(1).add(PINT.s(1))).toEqual(PINT.s(2));
  });

  test("adding quantities of different units", () => {
    expect(TEASPOON.s(1).add(TABLESPOON.s(1)).equals(TEASPOON.s(4))).toBe(true);
    expect(GALLON.s(1).add(QUART.s(1)).equals(GALLON.s(1.25))).toBe(true);
    expect(QUART.s(2).add(PINT.s(1)).equals(PINT.s(5))).toBe(true);
    expect(QUART.s(2).add(PINT.s(1)).equals(CUP.s(10))).toBe(true);
  });
});

describe("Distance objects", () => {
  test("are equal when quantity and units match", () => {
    expect(INCH.s(3).equals(INCH.s(3))).toBe(true);
    expect(FEET.s(1).equals(FEET.s(1))).toBe(true);
    expect(FEET.s(1).equals(YARD.s(1))).toBe(false);
  });

  test("are equal when unit is different", () => {
    expect(FEET.s(1).equals(INCH.s(12))).toBe(true);
    expect(FEET.s(3).equals(YARD.s(1))).toBe(true);
    expect(YARD.s(220).equals(FURLONG.s(1))).toBe(true);
    expect(FURLONG.s(16).equals(MILE.s(2))).toBe(true);
  });

  test("same units can be added", () => {
    expect(FEET.s(1).add(FEET.s(0)).equals(FEET.s(1))).toBe(true);
    expect(FEET.s(1).add(FEET.s(1)).equals(FEET.s(2))).toBe(true);
    expect(INCH.s(2).add(INCH.s(3)).equals(INCH.s(5))).toBe(true);
  });

  test("Different units can be added", () => {
    expect(FEET.s(1).add(YARD.s(1)).equals(FEET.s(4))).toBe(true);
    expect(FURLONG.s(1).add(YARD.s(220)).equals(FEET.s(1320))).toBe(true);
  });

  test("volume and distance are not equal", () => {
    expect(FEET.s(1).equals(TABLESPOON.s(1))).toBe(false);
    expect(INCH.s(1).equals(TEASPOON.s(1))).toBe(false);
  });

  test("volume and distance cannot be added", () => {
    const addIncompatibleTypes = () => {
      INCH.s(1).add(TEASPOON.s(1));
    };

    expect(addIncompatibleTypes).toThrow(TypeError);
  });
});
