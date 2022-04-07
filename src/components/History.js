import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import "../css/Game.css";

const styles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: 350,
  mt: 4,
};

const History = () => {
  const [history, setHistory] = useState("");

  useEffect(() => {
    const gameHistory = JSON.parse(localStorage.getItem("history"));
    if (gameHistory) setHistory(gameHistory);
  }, []);

  if (!history) {
    return (
      <Container sx={styles}>
        <Box>Complete games to see history!</Box>
      </Container>
    );
  } else {
    return (
      <Container id="history-container">
        <Box>
          {history.map((game, index) => {
            return (
              <Card variant="outlined" key={index} sx={{ maxWidth: 350 }}>
                <CardContent>
                  <p> Completed: {game.dateTimeCompleted}</p>
                  <p> {game.guesses}/6 Guesses</p>
                  <p>Wordle: {game.wordle.toUpperCase()}</p>
                  <p>Status: {game.won ? "Won :)" : "Lost :("}</p>
                </CardContent>
              </Card>
            );
          })}
        </Box>
        {/* { create a card & card content for each history element } */}
      </Container>
    );
  }
};

export default History;
