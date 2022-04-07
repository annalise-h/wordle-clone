import React, { Fragment } from "react";
import "../css/Game.css";

import Board from "./Board";
import GameOverModal from "./GameOverModal";
import Keyboard from "./Keyboard";
import { GameProvider } from "../GameContext";

const Game = () => {
  return (
    <GameProvider>
      <Board />
      <Keyboard />
      <GameOverModal />
    </GameProvider>
  );
};

export default Game;
