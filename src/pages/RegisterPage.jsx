import React, { useState, useEffect } from "react";
import { useAuth } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { registerJobSeeker, registerRecruiter } from "../services/ApiClient";
import Role from "../constants/Role";

const alphaRegex = /^[A-Za-z]+$/;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(Role.JOB_SEEKER);
  const [error, setError] = useState("");
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect if already authenticated
    if (isLoggedIn) {
      navigate("/"); // Redirect to home page
    }
  }, [isLoggedIn, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (role === Role.JOB_SEEKER) {
      if (!alphaRegex.test(firstName)) {
        setError("First name must contain only alphabetic characters");
        return;
      } else if (!alphaRegex.test(lastName)) {
        setError("Last name must contain only alphabetic characters");
        return;
      }
    }

    if (!/[A-Za-z]/.test(password)) {
      setError("Password must contain at least one letter");
      return;
    } else if (!/\d/.test(password)) {
      setError("Password must contain at least one number");
      return;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const payload = {};
    if (role === Role.JOB_SEEKER) {
      payload["email"] = email;
      payload["password"] = password;
      payload["first_name"] = firstName;
      payload["last_name"] = lastName;
      payload["mobile_number"] = phoneNumber;
    } else {
      payload["email"] = email;
      payload["password"] = password;
    }

    try {
      let result;
      if (role === Role.JOB_SEEKER) {
        result = await registerJobSeeker(payload);
      } else {
        result = await registerRecruiter(payload);
      }

      if (result.status_code === 201) {
        navigate("/login");
      } else if (result.status_code === 400) {
        setError(result.status_message);
        return;
      }
    } catch (error) {
      console.error("Error registering :", error.message);
    }
  };

  const onRoleChange = (e) => {
    setRole(e.target.value);
    setError("");
  };

  return (
    <FormContainer>
      <Form onSubmit={handleRegister}>
        <Title>Register</Title>
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
        {role === Role.JOB_SEEKER && (
          <div>
            <Input
              type="text"
              minLength="2"
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Input
              type="text"
              minLength="2"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
            <Input
              type="tel"
              pattern="^\d{10,15}$"
              placeholder="Phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>
        )}
        <Input
          type="password"
          minLength="8"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Button type="submit">Register</Button>
      </Form>
    </FormContainer>
  );
};

export default RegisterPage;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  background-color: #f5f5f5;
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
