import * as React from "react";
import flatMap from "lodash/flatMap";

import { PuzzlePortion } from "./PuzzlePortion";
import { PuzzleWrapper } from "./PuzzleWrapper";
import {
  usePuzzlePositions,
  usePuzzleDispatch,
  usePuzzleDimensions,
  usePuzzlePortions
} from "./PuzzleGame";

interface PuzzleProps {
  className?: string;
  portionClassName?: string;
}

export const Puzzle = ({ className, portionClassName }: PuzzleProps) => {
  const positions = usePuzzlePositions();
  const dispatch = usePuzzleDispatch();
  const { height, width } = usePuzzleDimensions();
  const { rowsCount, columnsCount } = usePuzzlePortions();

  const handleMove = (_: React.MouseEvent<HTMLButtonElement>, number: number) =>
    dispatch({ type: "move", number });

  return (
    <PuzzleWrapper
      height={height}
      width={width}
      rowsCount={rowsCount}
      columnsCount={columnsCount}
      className={className}
    >
      {flatMap(positions, (row, rowIndex) =>
        row.map(portionNumber => (
          <PuzzlePortion
            key={`${rowIndex}-${portionNumber}`}
            className={portionClassName}
            number={portionNumber}
            onClick={handleMove}
          />
        ))
      )}
    </PuzzleWrapper>
  );
};
