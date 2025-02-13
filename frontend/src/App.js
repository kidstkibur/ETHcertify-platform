// src/App.jsx

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IssuePage from "./pages/IssuePage";
import Home from "./pages/Home";
import ValidatePage from "./pages/ValidatePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/issue" element={<IssuePage />} />
        <Route path="/validate" element={<ValidatePage />} />
      </Routes>
    </Router>
  );
}

export default App;