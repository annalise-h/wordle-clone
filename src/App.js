import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Game from "./components/Game";
import Header from "./components/Header";
import History from "./components/History";
import InstructionsModal from "./components/InstructionsModal";
import "./css/Game.css";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Game />}></Route>
          <Route path="/about" element={<InstructionsModal />}></Route>
          <Route path="/history" element={<History />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
