import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const resumes = [
        { name: 'John Doe', age: 35, gender: 'Male', workRecord: '5 years at Company X' },
        { name: 'Jane Smith', age: 30, gender: 'Female', workRecord: '3 years at Company Y' },
        { name: 'Mike Johnson', age: 35, gender: 'Male', workRecord: '7 years at Company Z' },
        { name: 'Sara Connor', age: 28, gender: 'Female', workRecord: '' }, // No work record
    ];

    const [query, setQuery] = useState('');
    const [filteredResumes, setFilteredResumes] = useState([]);
    const navigate = useNavigate(); // Hook to handle navigation

    const handleSearch = (e) => {
        e.preventDefault();
        const lowerCaseQuery = query.toLowerCase().trim();

        const results = resumes.filter(resume => {
            const matchesGender = (lowerCaseQuery.includes('male') && resume.gender.toLowerCase() === 'male') ||
                                  (lowerCaseQuery.includes('female') && resume.gender.toLowerCase() === 'female');
            const hasWorkRecord = resume.workRecord.trim() !== '';
            const requiresWorkRecord = lowerCaseQuery.includes('have work');

            if (matchesGender && requiresWorkRecord) {
                return hasWorkRecord;
            } else if (matchesGender) {
                return true;
            } else if (requiresWorkRecord) {
                return hasWorkRecord;
            }

            return false;
        });

        setFilteredResumes(results);
    };

    const handleViewDetails = (name) => {
        navigate(`/resume/${encodeURIComponent(name)}`); // Encode the name for URL
    };
    

    return (
        <div style={styles.container}>
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by gender or work record..."
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Search</button>
            </form>
            <div style={styles.resultsContainer}>
                {filteredResumes.length > 0 ? (
                    filteredResumes.map((resume, index) => (
                        <div key={index} style={styles.resultItem}>
                            <h3 style={styles.resultTitle}>{resume.name}</h3>
                            <p><strong>Age:</strong> {resume.age}</p>
                            <p><strong>Gender:</strong> {resume.gender}</p>
                            <p><strong>Work Record:</strong> {resume.workRecord ? resume.workRecord : 'No work record available'}</p>
                            <button style={styles.viewButton} onClick={() => handleViewDetails(resume.name)}>View</button>
                        </div>
                    ))
                ) : (
                    query && <p style={styles.noResults}>No results found</p>
                )}
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '50px',
        padding: '0 20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px',
        width: '100%',
        maxWidth: '600px',
    },
    input: {
        width: '100%',
        padding: '12px',
        fontSize: '16px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        outline: 'none',
    },
    button: {
        marginLeft: '10px',
        padding: '12px 20px',
        fontSize: '16px',
        borderRadius: '8px',
        border: 'none',
        backgroundColor: '#4285f4',
        color: '#fff',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    resultsContainer: {
        width: '100%',
        maxWidth: '600px',
        marginTop: '20px',
    },
    resultItem: {
        padding: '15px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: 'green',
        color: '#fff',
        transition: 'transform 0.2s',
    },
    resultTitle: {
        marginBottom: '10px',
        color: '#fff',
    },
    viewButton: {
        padding: '8px 16px',
        backgroundColor: '#fff',
        color: 'green',
        border: '1px solid green',
        borderRadius: '4px',
        cursor: 'pointer',
        marginTop: '10px',
        fontWeight: 'bold',
    },
    noResults: {
        color: '#ff0000',
        fontWeight: 'bold',
    },
};

export default SearchPage;
