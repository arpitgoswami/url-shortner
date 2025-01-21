import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Faucet from "./pages/Faucet";
import ComingSoon from "./pages/AvailableSoon";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ComingSoon />} />
        <Route path="/faucet" element={<Faucet />} />
      </Routes>
    </Router>
  );
}

export default App;
