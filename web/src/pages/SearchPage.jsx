import React, { useState } from 'react';

const SearchPage = () => {
    const resumes = [
        { name: 'John Doe', age: 35, gender: 'Male', workRecord: '5 years at Company X' },
        { name: 'Jane Smith', age: 30, gender: 'Female', workRecord: '3 years at Company Y' },
        { name: 'Mike Johnson', age: 35, gender: 'Male', workRecord: '7 years at Company Z' },
        { name: 'Sara Connor', age: 28, gender: 'Female', workRecord: '' }, // No work record
        // Add more resumes as needed
    ];

    const [query, setQuery] = useState('');
    const [filteredResumes, setFilteredResumes] = useState([]);

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

    return (
        <div style={styles.container}>
            <form onSubmit={handleSearch} style={styles.form}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Search</button>
            </form>
            <div style={styles.resultsContainer}>
                {filteredResumes.length > 0 ? (
                    filteredResumes.map((resume, index) => (
                        <div key={index} style={styles.resultItem}>
                            <h3>{resume.name}</h3>
                            <p>Age: {resume.age}</p>
                            <p>Gender: {resume.gender}</p>
                            <p>Work Record: {resume.workRecord ? resume.workRecord : 'No work record available'}</p>
                        </div>
                    ))
                ) : (
                    query && <p>No results found</p>
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
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '20px',
    },
    input: {
        width: '400px',
        padding: '10px',
        fontSize: '16px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        marginLeft: '10px',
        padding: '10px 20px',
        fontSize: '16px',
        borderRadius: '4px',
        border: 'none',
        backgroundColor: '#4285f4',
        color: '#fff',
        cursor: 'pointer',
    },
    resultsContainer: {
        width: '400px',
        marginTop: '20px',
    },
    resultItem: {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: '#f9f9f9',
    },
};

export default SearchPage;
