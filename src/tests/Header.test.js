import React from "react";
import { screen, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter as Router } from "react-router-dom";

import Header from "../components/Header";

describe("Verifies App Bar renders correctly", () => {
  test("renders Header component", () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByTestId("help-icon")).toBeInTheDocument();
    expect(screen.getByTestId("title")).toBeInTheDocument();
    expect(screen.getByTestId("history-icon")).toBeInTheDocument();
  });
});
