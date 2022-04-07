import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { GameProvider } from "../GameContext";

import Keyboard from "../components/Keyboard";

describe("Verifies keyboard renders correctly", () => {
  test("renders Keyboard component", () => {
    render(
      <GameProvider>
        <Keyboard />;
      </GameProvider>
    );

    expect(screen.getByTestId("keyboard")).toBeInTheDocument();
  });
});
