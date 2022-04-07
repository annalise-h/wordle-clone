import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameProvider } from "../GameContext";

import Board from "../components/Board";

describe("Verifies game board renders correctly", () => {
  test("renders Game component", () => {
    render(
      <GameProvider>
        <Board />;
      </GameProvider>
    );

    expect(screen.getByTestId("board-container")).toBeInTheDocument();
  });
});
