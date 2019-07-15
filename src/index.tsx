import * as React from "react";
import immer from "immer";
import isEqual from "lodash/isEqual";
import flatten from "lodash/flatten";
import flatMap from "lodash/flatMap";

import { PuzzlePortion } from "./PuzzlePortion";
import { PuzzleWrapper } from "./PuzzleWrapper";

type Positions = (number | null)[][];

const move = (positions: Positions, number: number): Positions => {
  const rowIndex = positions.findIndex(
    rows => rows.findIndex(num => num === number) >= 0
  );
  const columnIndex = positions[rowIndex].findIndex(num => num === number);

  const isRightFree = positions[rowIndex][columnIndex + 1] === null;
  const isLeftFree = positions[rowIndex][columnIndex - 1] === null;
  const isTopFree =
    positions[rowIndex - 1] && positions[rowIndex - 1][columnIndex] === null;
  const isBottomFree =
    positions[rowIndex + 1] && positions[rowIndex + 1][columnIndex] === null;

  if (isRightFree) {
    return immer(positions, draft => {
      draft[rowIndex][columnIndex + 1] = number;
      draft[rowIndex][columnIndex] = null;
    });
  }

  if (isLeftFree) {
    return immer(positions, draft => {
      draft[rowIndex][columnIndex - 1] = number;
      draft[rowIndex][columnIndex] = null;
    });
  }

  if (isTopFree) {
    return immer(positions, draft => {
      draft[rowIndex - 1][columnIndex] = number;
      draft[rowIndex][columnIndex] = null;
    });
  }

  if (isBottomFree) {
    return immer(positions, draft => {
      draft[rowIndex + 1][columnIndex] = number;
      draft[rowIndex][columnIndex] = null;
    });
  }

  return positions;
};

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
  } while (!isSolvable(flatPositions));

  let result: Positions = [];
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    result[rowIndex] = flatPositions.slice(
      rowIndex * columnsCount,
      rowIndex * columnsCount + columnsCount
    );
  }
  return result;
};

interface Props {
  src: string;
  rowsCount: number;
  columnsCount: number;
  height: number;
  width: number;
  onFinish: Function;
}

export const Puzzle = ({
  src,
  rowsCount,
  columnsCount,
  height,
  width,
  onFinish
}: Props) => {
  const solution = generateSolution(rowsCount, columnsCount);
  const [positions, setPositions] = React.useState<Positions>(
    generateInitialPositions(rowsCount, columnsCount)
  );

  React.useEffect(() => {
    const flattenNumbers = flatten(positions);
    if (isEqual(flattenNumbers, solution)) {
      onFinish();
    }
  }, [positions]);

  const handleMove = (
    _: React.MouseEvent<HTMLButtonElement>,
    number: number
  ) => {
    setPositions(prevPositions => move(prevPositions, number));
  };

  return (
    <PuzzleWrapper
      height={height}
      width={width}
      rowsCount={rowsCount}
      columnsCount={columnsCount}
    >
      {flatMap(positions, (row, rowIndex) =>
        row.map(portionNumber => (
          <PuzzlePortion
            key={`${rowIndex}-${portionNumber}`}
            src={src}
            number={portionNumber}
            totalHeight={height}
            totalWidth={width}
            rowsCount={rowsCount}
            columnsCount={columnsCount}
            onClick={handleMove}
          />
        ))
      )}
    </PuzzleWrapper>
  );
};
