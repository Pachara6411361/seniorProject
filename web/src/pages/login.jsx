// Login.js
import React, { useState } from "react";
import { useAuth } from '../Components/AuthContext';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userType, setUserType] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (userType === "user" || userType === "staff") {
      login(userType);
      navigate("/home"); // Redirect to home after login
    } else {
      setError("Invalid user type. Please select either 'user' or 'staff'.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            User Type:
            <select value={userType} onChange={(e) => setUserType(e.target.value)}>
              <option value="">Select User Type</option>
              <option value="user">User</option>
              <option value="staff">Staff</option>
            </select>
          </label>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
