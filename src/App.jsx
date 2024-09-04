import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignUp.jsx";
import { useState, useContext } from "react";
import AuthContext from "./constants/context";
import LoginPage from "./pages/SignIn.jsx";


function App() {
  const [user, setUser] = useState(0);
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default App;
