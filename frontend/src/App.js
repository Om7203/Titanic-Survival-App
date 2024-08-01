import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import History from "./pages/History";
import Navbar from "./components/Navbar";
import UserContext from "./context/userContext"; // Ensure this path is correct

function App() {
  const [userData, setUserData] = useState([]);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/calculator" element={<Calculator />} /> {/* Ensure this path is lowercase */}
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
