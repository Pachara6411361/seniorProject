// src/components/DropFileInput.js
import React, { useRef, useState } from "react";
import styled from "styled-components";

const DropFileInput = ({ onFileChange = (_) => {} }) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.add("dragover");
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.remove("dragover");
  };

  const onDrop = (e) => {
    e.preventDefault();
    
    wrapperRef.current.classList.remove("dragover");
    const files = Array.from(e.dataTransfer.files);

    if (files.length > 0) {
      const updatedList = [...fileList, ...files];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const onFileDrop = (e) => {
    const newFiles = Array.from(e.target.files);
    if (newFiles.length > 0) {
      const updatedList = [...fileList, ...newFiles];
      setFileList(updatedList);
      onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = fileList.filter((f) => f !== file);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  const formatFileSize = (size) => {
    if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + " MB";
    if (size >= 1024) return (size / 1024).toFixed(2) + " KB";
    return size + " B";
  };

  return (
    <DropFileInputContainer>
      {fileList.length == 0 ? (
        <Dropzone
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => wrapperRef.current.querySelector("input").click()}
        >
          <input type="file" accept=".pdf" onChange={onFileDrop} hidden />
          <DropText>
            <span>Click to upload</span>
          </DropText>
          <SubText>Maximum file size 50 MB.</SubText>
        </Dropzone>
      ) : (
        <FileList>
          {fileList.map((file, index) => (
            <FileItem key={index}>
              <FileDetails>
                <FileName>{file.name}</FileName> {/* Blue file name */}
                <FileSize>{formatFileSize(file.size)}</FileSize>
              </FileDetails>
              <RemoveButton onClick={() => fileRemove(file)}>✕</RemoveButton>
            </FileItem>
          ))}
        </FileList>
      )}
    </DropFileInputContainer>
  );
};

export default DropFileInput;

// Styled components
const DropFileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background-color: #f5f5f5;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Dropzone = styled.div`
  width: 80%;
  max-width: 600px;
  padding: 40px;
  margin: 10px;
  border: 2px dashed #ccc;
  border-radius: 10px;
  background-color: #f9f9f9;
  text-align: center;
  cursor: pointer;
  min-width: 350px;
  &:hover {
    background-color: #e0e0e0;
  }
  &.dragover {
    background-color: #e0e0e0;
  }
`;

const DropText = styled.p`
  font-size: 1.2rem;
  color: #333;
  span {
    color: #4285f4;
    font-weight: bold;
  }
`;

const SubText = styled.p`
  color: #888;
  font-size: 0.9rem;
`;

const FileList = styled.div`
  width: 100%;
  max-width: 600px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
  border-top: 1px solid #ddd;
`;

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const FileName = styled.span`
  font-size: 1rem;
  font-weight: bold;
  margin-right: 10px;
  color: #4285f4; /* Blue file name */
`;

const FileSize = styled.span`
  color: #888;
`;

const RemoveButton = styled.button`
  background-color: #ff0000; /* Red background */
  border: none;
  font-size: 1.2rem;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #cc0000; /* Darker red on hover */
  }
`;
