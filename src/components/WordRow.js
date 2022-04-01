import React, { useContext } from "react";
import { GameContext } from "../GameContext";
import Box from "@mui/material/Box";

const tileStyle = {
  display: "inline",
  boxSizing: "border-box",
  m: "auto",
  border: 1,
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const WordRow = (props) => {
  const board = useContext(GameContext)[2];

  const rowTiles = board[props.rowNum];

  return (
    <>
      {rowTiles.map((tile, index) => {
        return (
          <Box sx={tileStyle} key={index}>
            {tile.character}
          </Box>
        );
      })}
    </>
  );
};

export default WordRow;
