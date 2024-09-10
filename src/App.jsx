import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignUp.jsx";
import { useState, useContext } from "react";
import AuthContext from "./constants/context";
import LoginPage from "./pages/SignIn.jsx";
import StatisticsPage from "./pages/Stats.jsx";
import DonationForm from "./pages/DonationForm.jsx";
import MyDonations from "./pages/MyDonations.jsx";
import DonationDetails from "./pages/DonationDetails.jsx";


function App() {
  const [user, setUser] = useState(0);
  return (
    <>
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Routes>
            <Route path="/" element={<SignupPage />} />
            <Route path="/sign-in" element={<LoginPage />} />
            <Route path="/stats" element={<StatisticsPage />} /> 
            <Route path="/donate" element={<DonationForm />} /> 
            <Route path="/mydonations" element={<MyDonations />} />  
            <Route path="/donation/:id" element={<DonationDetails />} />
          </Routes>
        </Router>
      </AuthContext.Provider>
    </>
  );
};

export default App;
