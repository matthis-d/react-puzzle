import * as React from "react";
import isEqual from "lodash/isEqual";
import flatten from "lodash/flatten";

import { move } from "./utils/movePuzzle";
import {
  generateSolution,
  generateInitialPositions
} from "./utils/generatePuzzle";

type Positions = (number | null)[][];

type Action =
  | { type: "move"; number: number }
  | { type: "reset" }
  | { type: "set"; positions: Positions };
type Dispatch = (action: Action) => void;
type State = Positions;
type PuzzleGameProps = {
  /**
   * Child components to display.
   */
  children: React.ReactNode;

  /**
   * The action to execute once the Puzzle is resolved.
   */
  onFinish: () => void;

  /**
   * Number of rows to display.
   */
  rowsCount: number;

  /**
   * Number of columns to display.
   */
  columnsCount: number;

  /**
   * Image source.
   */
  src: string;

  /**
   * Height in pixels it should be displayed.
   */
  height: number;

  /**
   * Width in pixels it should be displayed.
   */
  width: number;
};

const PuzzlePositionsStateContext = React.createContext<State | undefined>(
  undefined
);

const PuzzlePositionsDispatchContext = React.createContext<
  Dispatch | undefined
>(undefined);

const PuzzlePortionsContext = React.createContext<
  { rowsCount: number; columnsCount: number } | undefined
>(undefined);

const PuzzleImageContext = React.createContext<string | undefined>(undefined);

const PuzzleDimensionsContext = React.createContext<
  { height: number; width: number } | undefined
>(undefined);

function usePuzzlePositions() {
  const context = React.useContext(PuzzlePositionsStateContext);
  if (context === undefined) {
    throw new Error("usePuzzlePositions must be within a PuzzleGame");
  }
  return context;
}

function usePuzzleDispatch() {
  const context = React.useContext(PuzzlePositionsDispatchContext);
  if (context === undefined) {
    throw new Error("usePuzzleDispatch must be within a PuzzleGame");
  }
  return context;
}

function usePuzzlePortions() {
  const context = React.useContext(PuzzlePortionsContext);
  if (context === undefined) {
    throw new Error("usePuzzlePortions must be within a PuzzleGame");
  }
  return context;
}

function usePuzzleImage() {
  const context = React.useContext(PuzzleImageContext);
  if (context === undefined) {
    throw new Error("usePuzzleImage must be within a PuzzleGame");
  }
  return context;
}

function usePuzzleDimensions() {
  const context = React.useContext(PuzzleDimensionsContext);
  if (context === undefined) {
    throw new Error("usePuzzleDimensions must be within a PuzzleGame");
  }
  return context;
}

function PuzzleGame({
  children,
  onFinish,
  rowsCount,
  columnsCount,
  src,
  height,
  width
}: PuzzleGameProps) {
  const [initialPositions] = React.useState(
    generateInitialPositions(rowsCount, columnsCount)
  );

  const solution = generateSolution(rowsCount, columnsCount);

  function positionsReducer(state: State, action: Action) {
    switch (action.type) {
      case "move":
        return move(state, action.number);
      case "reset":
        return initialPositions;
      case "set":
        return action.positions;
      default:
        throw new Error(`Unhandled action type`);
    }
  }

  const [positions, dispatch] = React.useReducer(
    positionsReducer,
    initialPositions
  );

  React.useEffect(() => {
    const flattenNumbers = flatten(positions);
    if (isEqual(flattenNumbers, solution)) {
      onFinish();
    }
  }, [onFinish, positions, solution]);

  return (
    <PuzzlePositionsStateContext.Provider value={positions}>
      <PuzzlePositionsDispatchContext.Provider value={dispatch}>
        <PuzzlePortionsContext.Provider value={{ rowsCount, columnsCount }}>
          <PuzzleImageContext.Provider value={src}>
            <PuzzleDimensionsContext.Provider value={{ height, width }}>
              {children}
            </PuzzleDimensionsContext.Provider>
          </PuzzleImageContext.Provider>
        </PuzzlePortionsContext.Provider>
      </PuzzlePositionsDispatchContext.Provider>
    </PuzzlePositionsStateContext.Provider>
  );
}

export {
  PuzzleGame,
  usePuzzlePositions,
  usePuzzleDispatch,
  usePuzzlePortions,
  usePuzzleImage,
  usePuzzleDimensions
};
