import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar.jsx";
import { AuthProvider } from "./hooks/AuthContext.jsx";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ResumePage from "./pages/ResumePage.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import ResumeDetailPage from "./pages/ResumeDetailPage.jsx";
import ManageSkillPage from "./pages/ManageSkillPage.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected routes */}
          <Route
            path="/upload"
            element={<ProtectedRoute element={<UploadPage />} />}
          />
          <Route
            path="/resume"
            element={<ProtectedRoute element={<ResumePage />} />}
          />
          <Route
            path="/search"
            element={<ProtectedRoute element={<SearchPage />} />}
          />
          <Route
            path="/manage-skill"
            element={<ProtectedRoute element={<ManageSkillPage />} />}
          />
          <Route
            path="/resume/detail/:userId"
            element={<ProtectedRoute element={<ResumeDetailPage />} />}
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
