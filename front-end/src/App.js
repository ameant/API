import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Catway from "./pages/Catway";
import Reservation from "./pages/Reservation";
import Catways from "./pages/Catways";
import Reservations from "./pages/Reservations";
import Documentation from "./pages/Documentation";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/catways/:id" element={<Catway />}></Route>
        <Route path="/reservations/:id" element={<Reservation />}></Route>
        <Route path="/catways" element={<Catways />}></Route>
        <Route path="/reservations" element={<Reservations />}></Route>
        <Route path="/docs" element={<Documentation />}></Route>
      </Routes>
    </div>
  );
}

export default App;
