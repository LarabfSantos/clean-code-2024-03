const { TEASPOON, TABLESPOON, OUNCE, INCH } = require("./unit");

describe("Unit objects....", () => {
  test("can calculate amounts in other units", () => {
    expect(TEASPOON.convertedAmount(3, TEASPOON)).toBe(3);
    expect(TEASPOON.convertedAmount(1, TABLESPOON)).toBe(3);
    expect(TEASPOON.convertedAmount(1, OUNCE)).toBe(2 * 3);
  });

  test("volume cannot be converted to distance", () => {
    const t = () => {
      INCH.convertedAmount(1, TABLESPOON);
    };

    expect(t).toThrow(TypeError);
  });
});
