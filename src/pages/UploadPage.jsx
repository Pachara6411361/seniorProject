import React from "react";
import DropFileInput from "../components/DropFileInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

const UploadPage = () => {
  const { userId } = useAuth();
  const navigate = useNavigate();

  return (
    <UploadContainer>
      <Title>File Drag and Drop Here</Title>
      <DropFileInput />
    </UploadContainer>
  );
};

export default UploadPage;

// Styled components for centering the title
const UploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  min-height: 100vh;
  background-color: #f5f5f5;
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #002147;
  margin-bottom: 20px;
`;
