import React from "react";
import Modal from "@mui/material/Modal";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "../css/InstructionModal.css";

const modalStyle = {
  position: "absolute",
  top: { xs: "40%", sm: "40%", md: "50%" },
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "80%", sm: "350px" },
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  mt: 2,
  fontFamily: "Roboto",
};

const tileStyle = {
  boxSizing: "border-box",
  m: "auto",
  border: 1,
  height: "100%",
  width: 20,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
};

const exampleRowTiles1 = [
  { character: "W", guessProximity: "good" },
  { character: "E", guessProximity: "" },
  { character: "A", guessProximity: "" },
  { character: "R", guessProximity: "" },
  { character: "Y", guessProximity: "" },
];
const exampleRowTiles2 = [
  { character: "P", guessProximity: "" },
  { character: "I", guessProximity: "close" },
  { character: "L", guessProximity: "" },
  { character: "L", guessProximity: "" },
  { character: "S", guessProximity: "" },
];
const exampleRowTiles3 = [
  { character: "V", guessProximity: "" },
  { character: "A", guessProximity: "" },
  { character: "G", guessProximity: "" },
  { character: "U", guessProximity: "bad" },
  { character: "E", guessProximity: "" },
];

const InstructionsModal = () => {
  return (
    <Modal open={true}>
      <Container>
        <Box sx={modalStyle} className="instructions">
          <p>
            Guess the <strong>WORDLE</strong> in six tries.
          </p>
          <p>
            Each guess must be a valid five-letter word. Hit the enter button to
            submit.
          </p>
          <p>
            After each guess, the color of the tiles will change to show how
            close your guess was to the word.
          </p>
          <div className="examples">
            <p>
              <strong>Examples</strong>
            </p>
            <div className="example">
              {exampleRowTiles1.map((tile, index) => {
                return (
                  <Box
                    sx={tileStyle}
                    key={index}
                    className={tile.guessProximity}
                  >
                    {tile.character}
                  </Box>
                );
              })}
            </div>
            <p>
              The letter <strong>W</strong> is in the word and in the correct
              spot.
            </p>
            <div className="example">
              {exampleRowTiles2.map((tile, index) => {
                return (
                  <Box
                    sx={tileStyle}
                    key={index}
                    className={tile.guessProximity}
                  >
                    {tile.character}
                  </Box>
                );
              })}
            </div>
            <p>
              The letter <strong>I</strong> is in the word but in the wrong
              spot.
            </p>
            <div className="example">
              {exampleRowTiles3.map((tile, index) => {
                return (
                  <Box
                    sx={tileStyle}
                    key={index}
                    className={tile.guessProximity}
                  >
                    {tile.character}
                  </Box>
                );
              })}
            </div>
            <p>
              The letter <strong>U</strong> is not in the word in any spot.
            </p>
          </div>
          <Link to="/" style={{ display: "block", textAlign: "center" }}>
            <Button> Let's Play! </Button>
          </Link>
        </Box>
      </Container>
    </Modal>
  );
};

export default InstructionsModal;
