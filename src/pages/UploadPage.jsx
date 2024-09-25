import React, { useState } from "react";
import DropFileInput from "../components/DropFileInput";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { uploadResume } from "../services/ApiClient";

const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { userId } = useAuth();
  const navigate = useNavigate();

  const onFileChange = (files) => {
    files[0] ? setSelectedFile(files[0]) : setSelectedFile();
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("resume_file", selectedFile);

    try {
      const result = await uploadResume(userId, formData);

      if (result.status_code === 200) {
        navigate("/resume");
      }
    } catch (error) {
      console.error("Error uploading resume in :", error.message);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <UploadContainer>
        <Title>File Drag and Drop Here</Title>
        <DropFileInput onFileChange={onFileChange} />
        {selectedFile && <Button type="submit">Upload</Button>}
      </UploadContainer>
    </form>
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
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 20px;
`;

const Button = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 25px 0;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  max-width: 500px;
  &:hover {
    background-color: #357ae8;
  }
`;
