import React from "react";
import "../css/Game.css";
import Board from "./Board";
import Header from "./Header";
import Keyboard from "./Keyboard";
import { GameProvider } from "../GameContext";

const Game = () => {
  return (
    <div className="App">
      <Header />
      <GameProvider>
        <Board />
        <Keyboard />
      </GameProvider>
    </div>
  );
};

export default Game;
