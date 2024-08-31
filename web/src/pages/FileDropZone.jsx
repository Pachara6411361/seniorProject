import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import './drop-file-input.css';
import { ImageConfig } from '../config/ImageConfig';

const DropFileInput = ({ onFileChange }) => {

    const wrapperRef = useRef(null);
    const [fileList, setFileList] = useState([]);

    const onDragEnter = (e) => {
        e.preventDefault();
        wrapperRef.current.classList.add('dragover');
    };

    const onDragLeave = (e) => {
        e.preventDefault();
        wrapperRef.current.classList.remove('dragover');
    };

    const onDrop = (e) => {
        e.preventDefault();
        wrapperRef.current.classList.remove('dragover');
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
        const updatedList = fileList.filter(f => f !== file);
        setFileList(updatedList);
        onFileChange(updatedList);
    };

    const formatFileSize = (size) => {
        if (size >= 1024 * 1024) return (size / (1024 * 1024)).toFixed(2) + ' MB';
        if (size >= 1024) return (size / 1024).toFixed(2) + ' KB';
        return size + ' B';
    };

    return (
        <>
            <div
                ref={wrapperRef}
                className="drop-file-input"
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
            >
                <div className="drop-file-input__label">
                    <img src={"https://media.geeksforgeeks.org/wp-content/uploads/20240308113922/Drag-.png"}
                        alt="Drag and Drop Icon" />
                    <p>Drag & Drop your files here</p>
                </div>
                <input
                    type="file"
                    multiple
                    onChange={onFileDrop}
                />
            </div>
            {
                fileList.length > 0 && (
                    <div className="drop-file-preview">
                        <p className="drop-file-preview__title">
                            Ready to upload
                        </p>
                        {
                            fileList.map((item, index) => (
                                <div key={index} className="drop-file-preview__item">
                                    <img
                                        src={ImageConfig[item.type.split('/')[1]] ||
                                            ImageConfig['default']}
                                        alt={item.name}
                                    />
                                    <div className="drop-file-preview__item__info">
                                        <p>{item.name}</p>
                                        <p>{formatFileSize(item.size)}</p>
                                    </div>
                                    <span className="drop-file-preview__item__del"
                                        onClick={() => fileRemove(item)}>
                                        x
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    );
}

DropFileInput.propTypes = {
    onFileChange: PropTypes.func.isRequired
};

export default DropFileInput;
