import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar/index.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/index.jsx";
import About from "./pages/about.jsx";
import Events from "./pages/events.jsx";
import AnnualReport from "./pages/annual.jsx";
import Teams from "./pages/team.jsx";
import Upload from "./pages/upload.jsx";
import SignUp from "./pages/signup.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import { AuthProvider } from "./Components/AuthContext.jsx";
import Login from "./pages/login.jsx";
import ResumeDetailsPage from "./ResumeDetailsPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/events" element={<Events />} />
          <Route path="/annual" element={<AnnualReport />} />
          <Route path="/team" element={<Teams />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/resume/:name" element={<ResumeDetailsPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
