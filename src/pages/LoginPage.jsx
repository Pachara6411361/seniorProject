import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Role from "../constants/Role";
import { loginJobSeeker, loginRecruiter } from "../services/ApiClient";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { isLoggedIn, login } = useAuth();
  const [role, setRole] = useState(Role.JOB_SEEKER);
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isLoggedIn) {
      navigate("/"); // Redirect to home page
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    const payload = {};
    payload["email"] = email;
    payload["password"] = password;

    try {
      let result;
      if (role === Role.JOB_SEEKER) {
        result = await loginJobSeeker(payload);
      } else {
        result = await loginRecruiter(payload);
      }

      if (result.status_code === 200) {
        login(result.data.access_token);
        if (role === Role.JOB_SEEKER) {
          navigate("/resume");
        } else {
          navigate("/search");
        }
      } else if (result.status_code === 400) {
        setError(result.status_message);
        return;
      }
    } catch (error) {
      console.error("Error logging in :", error.message);
    }
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
    setError("");
  };

  return (
    <FormContainer>
      <Form onSubmit={handleLogin}>
        <Title>Login to Your Account</Title>
        <RoleContainer>
          <RoleLabel>
            <input
              type="radio"
              value={Role.JOB_SEEKER}
              checked={role === Role.JOB_SEEKER}
              onChange={onRoleChange}
            />
            Job Seeker
          </RoleLabel>
          <RoleLabel>
            <input
              type="radio"
              value={Role.RECRUITER}
              checked={role === Role.RECRUITER}
              onChange={onRoleChange}
            />
            Recruiter
          </RoleLabel>
        </RoleContainer>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </Form>
    </FormContainer>
  );
};

export default LoginPage;

// Styled components

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const Form = styled.form`
  background: #0a1f44;
  padding: 5vw;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
  min-width: 280px;
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 2vw, 3rem);
  margin-bottom: 1rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 10px 0;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #357ae8;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 10px;
`;

const RoleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
`;

const RoleLabel = styled.label`
  font-size: 1rem;
  color: white;
  cursor: pointer;
  input {
    margin-right: 10px;
  }
`;
