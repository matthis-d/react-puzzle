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

export const generateRandomIndex = (
  positions: Array<number | null>
): number => {
  return Math.floor(Math.random() * positions.length);
};

export const invertRandomly = (
  positions: Array<number | null>
): Array<number | null> => {
  const random = generateRandomIndex(positions);
  let random2 = generateRandomIndex(positions);
  while (random2 === random) {
    random2 = generateRandomIndex(positions);
  }

  return immer(positions, draft => {
    const prevVal = draft[random];
    draft[random] = draft[random2];
    draft[random2] = prevVal;
  });
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

export const generateInitialPositions = (
  rowsCount: number,
  columnsCount: number
): Positions => {
  let flatPositions = generateSolution(rowsCount, columnsCount);

  const inversions = Math.floor(Math.random() * 20) + 1;
  let inversionCount = 0;
  while (inversionCount < inversions) {
    flatPositions = invertRandomly(flatPositions);
    flatPositions = invertRandomly(flatPositions);
    inversionCount++;
  }

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
