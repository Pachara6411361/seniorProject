import React from 'react';
import { useParams } from 'react-router-dom';

const ResumeDetailsPage = () => {
    const { name } = useParams(); // Get the resume name from the URL

    const resumes = [
        { name: 'John Doe', age: 35, gender: 'Male', workRecord: '5 years at Company X' },
        { name: 'Jane Smith', age: 30, gender: 'Female', workRecord: '3 years at Company Y' },
        { name: 'Mike Johnson', age: 35, gender: 'Male', workRecord: '7 years at Company Z' },
        { name: 'Sara Connor', age: 28, gender: 'Female', workRecord: '' }, // No work record
    ];

    const resume = resumes.find(r => r.name === decodeURIComponent(name)); // Find the resume by name

    if (!resume) {
        return <h2>Resume not found</h2>;
    }

    return (
        <div style={styles.container}>
            <h1>Resume Details for {resume.name}</h1>
            <p><strong>Age:</strong> {resume.age}</p>
            <p><strong>Gender:</strong> {resume.gender}</p>
            <p><strong>Work Record:</strong> {resume.workRecord || 'No work record available'}</p>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        textAlign: 'center',
    },
};

export default ResumeDetailsPage;
