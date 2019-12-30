import isEqual from "lodash/isEqual";

type Positions = (number | null)[][];

export const generateRandomIndex = (maxIndex: number): number => {
  return Math.floor(Math.random() * maxIndex);
};

export const generateSolution = (rowsCount: number, columnsCount: number) => {
  const totalIndexes = rowsCount * columnsCount;
  let flatPositions = [];
  for (let i = 1; i < totalIndexes; i++) {
    flatPositions.push(i);
  }
  flatPositions.push(null);
  return flatPositions;
};

// Code inspired by https://medium.com/@ssaurel/developing-a-15-puzzle-game-of-fifteen-in-java-dfe1359cc6e3
export const isSolvable = (flatPositions: (number | null)[]): boolean => {
  let countInversions = 0;
  for (let i = 0; i < flatPositions.length; i++) {
    for (let j = 0; j < i; j++) {
      if (
        flatPositions[j] !== null &&
        flatPositions[i] !== null &&
        // @ts-ignore values can't be null here
        flatPositions[j] > flatPositions[i]
      ) {
        countInversions++;
      }
    }
  }
  return countInversions % 2 === 0;
};

export const generateInitialPositions = (
  rowsCount: number,
  columnsCount: number
): Positions => {
  let flatPositions: (number | null)[] = [];
  // Code inspired by https://medium.com/@ssaurel/developing-a-15-puzzle-game-of-fifteen-in-java-dfe1359cc6e3
  do {
    flatPositions = generateSolution(rowsCount, columnsCount);

    let inversionCount = rowsCount * columnsCount - 1;
    while (inversionCount > 1) {
      const index = generateRandomIndex(inversionCount--);
      const prevVal = flatPositions[index];
      flatPositions[index] = flatPositions[inversionCount];
      flatPositions[inversionCount] = prevVal;
    }
  } while (
    !isSolvable(flatPositions) ||
    isEqual(flatPositions, generateSolution(rowsCount, columnsCount))
  );

  let result: Positions = [];
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    result[rowIndex] = flatPositions.slice(
      rowIndex * columnsCount,
      rowIndex * columnsCount + columnsCount
    );
  }
  return result;
};
