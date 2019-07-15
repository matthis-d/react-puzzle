import flatten from "lodash/flatten";
import {
  generateSolution,
  generateRandomIndex,
  generateInitialPositions
} from "../src";

describe("generateSolution", () => {
  it("should generate a correct solution", () => {
    const solution = generateSolution(2, 2);
    expect(solution).toEqual([1, 2, 3, null]);
  });

  it("should generate a correct solution with bigger numbers", () => {
    const solution = generateSolution(3, 4);
    expect(solution).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, null]);
  });
});

describe("generateRandomIndex", () => {
  it("should generate a number greater than 0 and lower than given value", () => {
    const index = generateRandomIndex(16);
    expect(index).toBeGreaterThanOrEqual(0);
    expect(index).toBeLessThan(16);
  });
});

describe("generateInitialPositions", () => {
  it("should generate an array with given numbers of rows", () => {
    expect(generateInitialPositions(3, 4)).toHaveLength(3);
  });

  it("should generate an array with given numbers of columns", () => {
    const positions = generateInitialPositions(3, 4);
    positions.forEach(row => expect(row).toHaveLength(4));
  });

  it("should generate an array containing all required numbers", () => {
    const positions = generateInitialPositions(3, 4);
    const flattenPositions = flatten(positions);
    for (let i = 1; i <= 11; i++) {
      expect(flattenPositions).toContain(i);
    }
    expect(flattenPositions).toContain(null);
  });
});
