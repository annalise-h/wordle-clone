import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { GameContext } from "../GameContext";

const keys = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["↵", "z", "x", "c", "v", "b", "n", "m", "←"],
];

const keyboardStyles = {
  mt: 3,
};

// Keyboard accesses game state to decide which WordRow is active
// Keyboard then targets that state in the Board

const Keyboard = () => {
  const [game, setGame, board, setBoard] = useContext(GameContext);
  const { activeWordRow } = game;

  const handleClick = (e) => {
    const activeTileIndex = findActiveTileIndex();
    const keyPressed = e.target.dataset.key;

    // TODO: Split logic here depending on if keyPressed is return, delete, or a character

    const newBoard = [...board];
    newBoard[activeWordRow][activeTileIndex].character = keyPressed;
    setBoard(newBoard);
    setActiveTile(keyPressed);
  };

  // TODO: Consider moving active tile to global state

  const findActiveTileIndex = () => {
    const wordRow = board[activeWordRow];
    const tileIndex = wordRow.findIndex((tile) => tile.active === true);
    return tileIndex;
  };

  const setActiveTile = (keyPressed) => {
    const activeTileIndex = findActiveTileIndex();
    // when a user enters a character, add 1 to the active tile index
    if (keyPressed != "←" && keyPressed != "↵") {
      const newIndex = activeTileIndex + 1;
      // if the new index would put the user over 5 tiles, return early
      if (newIndex > 4) return;
      board[activeWordRow][activeTileIndex].active = false;
      board[activeWordRow][newIndex].active = true;
    }
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
