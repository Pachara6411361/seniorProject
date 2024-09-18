import React from "react";
import FileDropZone from "./FileDropZone";
import styled from "styled-components";

const Upload = () => {
  return (
    <UploadContainer>
      <Title>File Drag and Drop Here</Title>
      <FileDropZone />
    </UploadContainer>
  );
};

export default Upload;

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

