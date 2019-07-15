import immer from "immer";

type Positions = (number | null)[][];

export const move = (positions: Positions, number: number): Positions => {
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
