import React, { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { GameContext } from "../GameContext";
import { resetGameState } from "../utils";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "30%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", md: "300px" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  mt: 2,
};

const GameOverModal = () => {
  const [wordleDef, setWordleDef] = useState("");

  const { gameState, boardState } = useContext(GameContext);
  const [game, setGame] = gameState;
  const [board, setBoard] = boardState;

  const gameOverMessage = () => {
    if (game.won) {
      return "You won!";
    } else {
      return `You lost :( The worlde was ${game.wordle}`;
    }
  };

  const fetchWordleDefinition = async (wordle) => {
    const defResponse = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${wordle}`
    );
    const defJSON = await defResponse.json();
    const wordleDefinition = defJSON[0].meanings[0].definitions[0].definition;
    setWordleDef(wordleDefinition);
  };

  useEffect(async () => {
    await fetchWordleDefinition(game.wordle);
  }, []);

  const handleNewGameClick = () => {
    const finalGameState = { ...game };
    finalGameState.gameOverModalOpen = false;
    setGame(finalGameState);
    startNewGame();
  };

  const startNewGame = () => {
    const [newGame, newBoard] = resetGameState();
    setGame(newGame);
    setBoard(newBoard);
  };

  return (
    <Modal open={game.gameOverModalOpen}>
      <Container>
        <Box sx={modalStyle}>
          <h3>{gameOverMessage()}</h3>
          <p>{game.wordle}:</p>
          <p>{wordleDef}</p>
          <p>You guessed {game.guesses} out of 6 rows</p>
          <Button onClick={handleNewGameClick}> Start New Game </Button>
        </Box>
      </Container>
    </Modal>
  );
};

export default GameOverModal;
