import React, { useState, createContext } from "react";
import wordList from "./wordleCandidates";

export function Tile(active) {
  this.character = "";
  this.guessProximity = "";
  this.active = active;
}

// create a nested array of 6 rows with 5 tiles each for default board
export function Board() {
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

function getActiveGame() {
  return JSON.parse(localStorage.getItem("currentGame"));
}

function getActiveBoard() {
  return JSON.parse(localStorage.getItem("currentBoard"));
}

// TODO: Remove a wordle from the list if it's been played already
// possibly check the games in local storage to not repeat words
export const generateWordle = () => {
  const wordle = wordList[Math.floor(Math.random() * wordList.length)];
  return wordle;
};

export function Game(wordle) {
  this.wordle = wordle || generateWordle();
  this.completed = false;
  this.dateTimeCompleted = "";
  this.won = false;
  this.guesses = 0;
  this.activeWordRowIndex = 0;
  this.gameOverModalOpen = false;
  this.instructionsModalOpen = false;
}

export const GameContext = createContext();

export const GameProvider = (props) => {
  const [gameState, setGame] = useState(getActiveGame() || new Game());
  const [boardState, setBoard] = useState(getActiveBoard() || new Board());
  const [historyState, setHistory] = useState([]);

  return (
    <GameContext.Provider
      value={{
        gameState: [gameState, setGame],
        boardState: [boardState, setBoard],
        historyState: [historyState, setHistory],
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};
