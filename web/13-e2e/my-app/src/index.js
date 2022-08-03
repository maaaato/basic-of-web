// https://reactjs.org/tutorial/tutorial.html

import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import { Game } from "./components/Game";

const squares = Array(9).fill(null);

ReactDOM.render(
  <Game history={[{ squares: squares }]} />,
  document.getElementById("root")
);
