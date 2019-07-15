import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { PuzzleGame, Puzzle, usePuzzleDispatch } from "../.";
import image from "./assets/christmas-cat.jpg";

const ResetButton = () => {
  const dispatch = usePuzzleDispatch();

  return <button onClick={() => dispatch({ type: "reset" })}>Reset</button>;
};

const App = () => {
  return (
    <div>
      <PuzzleGame
        src={image}
        columnsCount={3}
        rowsCount={3}
        height={280}
        width={280}
        onFinish={() => console.log("Finished!!")}
      >
        <>
          <Puzzle />
          <ResetButton />
        </>
      </PuzzleGame>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
