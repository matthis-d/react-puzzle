import "react-app-polyfill/ie11";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Puzzle } from "../.";
import image from "./assets/igloo.jpg";

const App = () => {
  return (
    <div>
      <Puzzle
        src={image}
        columnsCount={2}
        rowsCount={2}
        height={280}
        width={280}
        onFinish={() => console.log("Finished!!")}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
