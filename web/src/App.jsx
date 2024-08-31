import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages";
import About from "./pages/about";
import Events from "./pages/events";
import AnnualReport from "./pages/annual";
import Teams from "./pages/team";
import Upload from "./pages/upload";
import SignUp from "./pages/signup";
import SearchPage from "./pages/SearchPage"; 
import ResumePage from "./pages/ResumePage";
import  { AuthProvider } from "./Components/AuthContext"
import Login from "./pages/login";

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
            </Routes>
        </Router>
        </AuthProvider>
        
    );
}

export default App;
