import React, { useState, createContext } from "react";

function Tile(active) {
  this.character = "";
  this.guessProximity = "";
  this.active = active;
}

// create a nested array of 6 rows with 5 tiles each for default game state
function Board() {
  const grid = [];
  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      const active = j === 0 ? true : false;

      grid[i].push(new Tile(active));
    }
  }

  return grid;
}

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [game, setGame] = useState({
    wordle: "",
    completed: false,
    guesses: [],
    activeWordRow: 0,
  });

  const [board, setBoard] = useState(new Board());

  return (
    <GameContext.Provider value={[game, setGame, board, setBoard]}>
      {props.children}
    </GameContext.Provider>
  );
};
