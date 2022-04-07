import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { GameContext } from "../GameContext";
import "../css/Game.css";
import {
  isAValidGuess,
  guessEqualsWordle,
  assignTileProximities,
  saveInProgressGame,
  clearInProgressGame,
  saveCompletedGame,
} from "../utils";

const keyboardStyles = {
  mt: 3,
  mx: "auto",
  p: 0,
};

const Keyboard = () => {
  const keys = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["↵", "Z", "X", "C", "V", "B", "N", "M", "←"],
  ];

  const { gameState, boardState } = useContext(GameContext);
  const [game, setGame] = gameState;
  const [board, setBoard] = boardState;

  let { activeWordRowIndex } = game;

  const findActiveTileIndex = () => {
    const wordRow = board[activeWordRowIndex];
    const tileIndex = wordRow.findIndex((tile) => tile.active === true);
    return tileIndex;
  };

  const [activeTileIndex, setActiveTileIndex] = useState(findActiveTileIndex());

  const handleClick = (e) => {
    const keyPressed = e.target.dataset.key;

    switch (keyPressed) {
      case "←":
        handleCharacterDelete();
        break;
      case "↵":
        handleRowSubmit();
        break;
      default:
        handleCharacterPress(keyPressed);
    }
  };

  const handleCharacterDelete = () => {
    if (activeTileIndex === 0 || game.completed) return;

    const newBoard = [...board];
    newBoard[activeWordRowIndex][activeTileIndex - 1].character = "";

    setBoard(newBoard);
    setActiveTileIndex(activeTileIndex - 1);
  };

  const handleRowSubmit = () => {
    // TODO: display user error if guess is less than 5 letters
    // for now just return
    if (activeTileIndex < 5 || game.completed) return;

    const userGuessTiles = board[activeWordRowIndex];
    const userGuess = userGuessTiles.reduce((word, tile) => {
      return word + tile.character;
    }, "");

    /* 
    If the user guess is a valid word, we want to do a few things
    we ALWAYS want to colorize the tiles
    check the guess against the current wordle
    three options: 
      1. Guess matches the worldle: user wins, end the game
      2. Guess does not match the wordle AND it's not the last row: increment the active row
      3. Guess does not match wordle, AND it's the last row: user loses, end game
    */

    if (isAValidGuess(userGuess)) {
      setActiveTileIndex(0);
      // colorize tiles
      const tiles = [...board[activeWordRowIndex]];
      const tilesWithProximities = assignTileProximities(tiles, game.wordle);
      const newBoard = [...board];
      newBoard[activeWordRowIndex] = tilesWithProximities;
      setBoard(newBoard);

      if (guessEqualsWordle(userGuess, game.wordle)) {
        clearInProgressGame();
        setActiveTileIndex(activeTileIndex + 1);
        openGameOverModal("won");
      } else if (activeWordRowIndex != 5) {
        activeWordRowIndex += 1;
        const newGameState = { ...game };
        newGameState.activeWordRowIndex = activeWordRowIndex;
        newGameState.guesses += 1;
        saveInProgressGame(newGameState, newBoard);
        setGame(newGameState);
      } else {
        clearInProgressGame();
        setActiveTileIndex(activeTileIndex + 1);
        openGameOverModal("lost");
      }
    } else {
      // TODO: display user error that their guess is not valid
      console.log("not a valid guess!");
      return;
    }
  };

  const openGameOverModal = (gameStatus) => {
    setActiveTileIndex(0);
    const gameWon = gameStatus === "won" ? true : false;
    const newGameState = { ...game };
    newGameState.dateTimeCompleted = new Date().toLocaleString();
    newGameState.completed = true;
    newGameState.completed = true;
    newGameState.won = gameWon;
    newGameState.gameOverModalOpen = true;
    newGameState.guesses += 1;
    saveCompletedGame(newGameState);
    setGame(newGameState);
  };

  const handleCharacterPress = (keyPressed) => {
    if (activeTileIndex > 4 || game.completed) return;

    const newBoard = [...board];
    newBoard[activeWordRowIndex][activeTileIndex].character = keyPressed;
    setBoard(newBoard);
    setActiveTileIndex(activeTileIndex + 1);
  };

  return (
    <Container data-testid="keyboard" id="keyboard" sx={{ p: { xs: 0 } }}>
      <Box sx={keyboardStyles}>
        {keys.map((keyRow, index) => (
          <div id={"row" + (index + 1)} key={index} className="keyboard-row">
            {keyRow.map((char, index) => {
              return (
                <Button
                  sx={{ minWidth: 2 }}
                  variant="contained"
                  className="key"
                  data-key={char}
                  key={index}
                  onClick={handleClick}
                >
                  {char}
                </Button>
              );
            })}
          </div>
        ))}
      </Box>
    </Container>
  );
};

export default Keyboard;
