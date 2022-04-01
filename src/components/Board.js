import React, { useState, useContext } from "react";
import WordRow from "./WordRow";
import Container from "@mui/material/Container";
import { GameContext } from "../GameContext";

const boardStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(6, 1fr)",
  gap: 1,
  width: 350,
  height: 420,
  mt: 2,
};

/** Board will receive "board" context from context api 
Board will decide which WordRow is active depending on context 
**/

const Board = () => {
  const board = useContext(GameContext)[2];

  return (
    <Container sx={boardStyles}>
      <WordRow rowNum={0} />
      <WordRow rowNum={1} />
      <WordRow rowNum={2} />
      <WordRow rowNum={3} />
      <WordRow rowNum={4} />
      <WordRow rowNum={5} />
    </Container>
  );
};

export default Board;
