import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { GameContext } from "../GameContext";
import {
  isAValidGuess,
  guessEqualsWordle,
  assignTileProximities,
} from "../utils";

const keys = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["↵", "Z", "X", "C", "V", "B", "N", "M", "←"],
];

const keyboardStyles = {
  mt: 3,
};

const Keyboard = () => {
  const [game, setGame, board, setBoard] = useContext(GameContext);
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
    if (activeTileIndex === 0) return;

    const newBoard = [...board];
    newBoard[activeWordRowIndex][activeTileIndex - 1].character = "";

    setBoard(newBoard);
    setActiveTileIndex(activeTileIndex - 1);
  };

  const handleRowSubmit = () => {
    // TODO: display user error if guess is less than 5 letters
    // for now just return
    if (activeTileIndex < 5) return;

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
      const tiles = [...board[activeWordRowIndex]];
      const tilesWithProximities = assignTileProximities(tiles, game.wordle);

      if (guessEqualsWordle(userGuess, game.wordle)) {
        startWinSequence(game.wordle);
      } else if (activeWordRowIndex != 5) {
        activeWordRowIndex += 1;
        const newGameState = { ...game };
        newGameState.activeWordRowIndex = activeWordRowIndex;
        setGame(newGameState);
        setActiveTileIndex(0);
      } else {
        startLoseSequence(game.wordle);
      }
    } else {
      // TODO: display user error that their guess is not valid
      console.log("not a valid guess!");
      return;
    }
  };

  const startWinSequence = (wordle) => {
    console.log(`You got the wordle: ${wordle}`);
  };

  const startLoseSequence = (wordle) => {
    console.log(`You lost! The wordle was ${wordle}`);
  };

  const handleCharacterPress = (keyPressed) => {
    if (activeTileIndex === 5) return;

    const newBoard = [...board];
    newBoard[activeWordRowIndex][activeTileIndex].character = keyPressed;
    setBoard(newBoard);
    setActiveTileIndex(activeTileIndex + 1);
  };

  return (
    <Container id="keyboard">
      <Box sx={keyboardStyles}>
        {keys.map((keyRow, index) => (
          <div id={"row" + (index + 1)} key={index} className="keyboard-row">
            {keyRow.map((char, index) => {
              return (
                <Button
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
