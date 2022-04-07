import React from "react";
import WordRow from "./WordRow";
import Container from "@mui/material/Container";

const boardStyles = {
  display: "grid",
  gridTemplateColumns: "repeat(5, 1fr)",
  gridTemplateRows: "repeat(6, 1fr)",
  gap: 1,
  width: 350,
  height: 420,
  mt: 2,
};

const Board = () => {
  return (
    <Container sx={boardStyles} data-testid="board-container">
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
