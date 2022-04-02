import React, { useState, createContext } from "react";
import wordList from "./wordleCandidates";

function Tile(active) {
  this.character = "";
  this.guessProximity = "";
  this.active = active;
}

// create a nested array of 6 rows with 5 tiles each for default board
function Board() {
  const grid = [];
  for (let i = 0; i < 6; i++) {
    grid.push([]);
    for (let j = 0; j < 5; j++) {
      // for the first tile in every row, set tile as active
      const active = j === 0 ? true : false;
      grid[i].push(new Tile(active));
    }
  }

  return grid;
}

const generateWordle = () => {
  const wordle = wordList[Math.floor(Math.random() * wordList.length)];
  return wordle;
};

function Game() {
  this.wordle = generateWordle();
  this.completed = false;
  this.guesses = [];
  this.activeWordRowIndex = 0;
}

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [game, setGame] = useState(new Game());

  const [board, setBoard] = useState(new Board());

  return (
    <GameContext.Provider value={[game, setGame, board, setBoard]}>
      {props.children}
    </GameContext.Provider>
  );
};
