import { getXPosition, getYPosition } from "../src/ImagePortion";

describe("getXPosition", () => {
  it("should return 0 when number is 1 in a 2x2 square of 300px", () => {
    expect(getXPosition(1, 2, 300)).toEqual(0);
  });

  it("should return 150 when number is 2 in a 2x2 square of 300px", () => {
    expect(getXPosition(2, 2, 300)).toEqual(150);
  });

  it("should return 0 when number is 3 in a 2x2 square of 300px", () => {
    expect(getXPosition(3, 2, 300)).toEqual(0);
  });
});

describe("getYPosition", () => {
  it("should return 0 when number is 1 in a 2x2 square of 300px", () => {
    expect(getYPosition(1, 2, 300)).toEqual(0);
  });

  it("should return 0 when number is 2 in a 2x2 square of 300px", () => {
    expect(getYPosition(2, 2, 300)).toEqual(0);
  });

  it("should return 150 when number is 3 in a 2x2 square of 300px", () => {
    expect(getYPosition(3, 2, 300)).toEqual(150);
  });
});
