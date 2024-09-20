import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchPage = () => {
    const resumes = [
        {
            name: 'John Doe',
            age: 35,
            gender: 'Male',
            workRecord: '5 years at Company X',
            workExperience: [
                { company: 'Company A', position: 'Software Engineer', duration: '2019 - 2022' },
                { company: 'Company B', position: 'Junior Developer', duration: '2017 - 2019' },
            ],
            education: { institution: 'University X', degree: 'B.Sc. in Computer Science', graduationYear: '2017' },
            skills: ['JavaScript', 'React', 'Node.js', 'HTML', 'CSS'],
        },
        {
            name: 'Jane Smith',
            age: 30,
            gender: 'Female',
            workRecord: '3 years at Company Y',
            workExperience: [
                { company: 'Company Y', position: 'Data Analyst', duration: '2020 - 2023' },
            ],
            education: { institution: 'University Y', degree: 'M.Sc. in Data Science', graduationYear: '2019' },
            skills: ['Python', 'R', 'SQL', 'Pandas', 'NumPy'],
        },
        {
            name: 'Mike Johnson',
            age: 40,
            gender: 'Male',
            workRecord: '7 years at Company Z',
            workExperience: [
                { company: 'Company Z', position: 'Project Manager', duration: '2015 - 2022' },
                { company: 'Company W', position: 'Team Lead', duration: '2010 - 2015' },
            ],
            education: { institution: 'University Z', degree: 'MBA', graduationYear: '2010' },
            skills: ['Java', 'Spring Boot', 'Project Management', 'Agile', 'Scrum'],
        },
        {
            name: 'Sara Connor',
            age: 28,
            gender: 'Female',
            workRecord: '',
            workExperience: [],
            education: { institution: 'University Q', degree: 'B.A. in English Literature', graduationYear: '2016' },
            skills: ['Python', 'Django', 'Flask', 'JavaScript'],
        },
        {
            name: 'David Lee',
            age: 32,
            gender: 'Male',
            workRecord: '6 years at Company M',
            workExperience: [
                { company: 'Company M', position: 'System Analyst', duration: '2017 - 2023' },
                { company: 'Company N', position: 'IT Support', duration: '2015 - 2017' },
            ],
            education: { institution: 'University M', degree: 'B.Sc. in Information Technology', graduationYear: '2015' },
            skills: ['C#', '.NET', 'SQL Server', 'Azure', 'PowerShell'],
        },
        {
            name: 'Emily Davis',
            age: 26,
            gender: 'Female',
            workRecord: '2 years at Company P',
            workExperience: [
                { company: 'Company P', position: 'Marketing Specialist', duration: '2021 - 2023' },
            ],
            education: { institution: 'University P', degree: 'B.B.A. in Marketing', graduationYear: '2021' },
            skills: ['JavaScript', 'HTML', 'CSS', 'React', 'Redux'],
        },
        {
            name: 'Robert Brown',
            age: 38,
            gender: 'Male',
            workRecord: '10 years at Company R',
            workExperience: [
                { company: 'Company R', position: 'Senior Software Developer', duration: '2013 - 2023' },
                { company: 'Company S', position: 'Software Developer', duration: '2008 - 2013' },
            ],
            education: { institution: 'University R', degree: 'M.Sc. in Software Engineering', graduationYear: '2008' },
            skills: ['C++', 'Java', 'Python', 'Algorithms', 'Data Structures'],
        },
        {
            name: 'Olivia White',
            age: 29,
            gender: 'Female',
            workRecord: '4 years at Company T',
            workExperience: [
                { company: 'Company T', position: 'Graphic Designer', duration: '2019 - 2023' },
                { company: 'Company U', position: 'Junior Graphic Designer', duration: '2017 - 2019' },
            ],
            education: { institution: 'Art Institute', degree: 'B.A. in Graphic Design', graduationYear: '2017' },
            skills: ['HTML', 'CSS', 'JavaScript', 'UI/UX Design', 'Figma'],
        },
        {
            name: 'Chris Martin',
            age: 45,
            gender: 'Male',
            workRecord: '15 years at Company V',
            workExperience: [
                { company: 'Company V', position: 'Chief Financial Officer', duration: '2008 - 2023' },
                { company: 'Company W', position: 'Finance Manager', duration: '2003 - 2008' },
            ],
            education: { institution: 'University V', degree: 'M.Sc. in Finance', graduationYear: '2003' },
            skills: ['Excel', 'VBA', 'Python', 'R', 'SQL'],
        },
        {
            name: 'Sophia Wilson',
            age: 27,
            gender: 'Female',
            workRecord: '5 years at Company X',
            workExperience: [
                { company: 'Company X', position: 'HR Specialist', duration: '2018 - 2023' },
            ],
            education: { institution: 'University X', degree: 'B.Sc. in Human Resources', graduationYear: '2018' },
            skills: ['Python', 'JavaScript', 'SQL', 'Tableau'],
        },
        // Add more resumes here...
    ];

    const [query, setQuery] = useState('');
    const [filteredResumes, setFilteredResumes] = useState(resumes); // Show all initially
    const [genderFilter, setGenderFilter] = useState('');
    const [workRecordFilter, setWorkRecordFilter] = useState(false);
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [companyFilter, setCompanyFilter] = useState('');
    const [positionFilter, setPositionFilter] = useState('');
    const [skillFilter, setSkillFilter] = useState('');
    const [selectedResume, setSelectedResume] = useState(null); // State to hold the selected resume details
    const navigate = useNavigate();

    const filterResumes = () => {
        let results = resumes;

        // Apply gender filter if selected
        if (genderFilter) {
            results = results.filter(resume => resume.gender.toLowerCase() === genderFilter.toLowerCase());
        }

        // Apply work record filter if selected
        if (workRecordFilter) {
            results = results.filter(resume => resume.workRecord.trim() !== '');
        }

        // Apply age range filter if both min and max age are provided
        if (minAge || maxAge) {
            results = results.filter(resume => {
                const age = resume.age;
                const isWithinMin = minAge ? age >= parseInt(minAge) : true;
                const isWithinMax = maxAge ? age <= parseInt(maxAge) : true;
                return isWithinMin && isWithinMax;
            });
        }

        // Company filter
        if (companyFilter) {
            results = results.filter(resume =>
                resume.workExperience.some(exp => exp.company.toLowerCase().includes(companyFilter.toLowerCase()))
            );
        }

        // Position filter
        if (positionFilter) {
            results = results.filter(resume =>
                resume.workExperience.some(exp => exp.position.toLowerCase().includes(positionFilter.toLowerCase()))
            );
        }

        // Skills filter - focusing on programming languages and technical skills
        if (skillFilter) {
            const skillQuery = skillFilter.toLowerCase();
            results = results.filter(resume =>
                resume.skills.some(skill => skill.toLowerCase().includes(skillQuery))
            );
        }

        // Search query filter: This handles the input from the main search bar
        if (query) {
            const lowerCaseQuery = query.toLowerCase();
            results = results.filter(resume =>
                resume.name.toLowerCase().includes(lowerCaseQuery) ||
                resume.gender.toLowerCase().includes(lowerCaseQuery) ||
                resume.workRecord.toLowerCase().includes(lowerCaseQuery) ||
                resume.workExperience.some(exp =>
                    exp.company.toLowerCase().includes(lowerCaseQuery) ||
                    exp.position.toLowerCase().includes(lowerCaseQuery)
                ) ||
                resume.skills.some(skill => skill.toLowerCase().includes(lowerCaseQuery))
            );
        }

        setFilteredResumes(results);
    };

    // Handler functions for each filter
    const handleGenderChange = (e) => {
        setGenderFilter(e.target.value);
        filterResumes();
    };

    const handleWorkRecordChange = (e) => {
        setWorkRecordFilter(e.target.checked);
        filterResumes();
    };

    const handleAgeChange = (e, type) => {
        if (type === 'min') {
            setMinAge(e.target.value);
        } else {
            setMaxAge(e.target.value);
        }
        filterResumes();
    };

    const handleCompanyChange = (e) => {
        setCompanyFilter(e.target.value);
        filterResumes();
    };

    const handlePositionChange = (e) => {
        setPositionFilter(e.target.value);
        filterResumes();
    };

    const handleSkillChange = (e) => {
        setSkillFilter(e.target.value);
        filterResumes();
    };

    // Updated function to set the selected resume when the View button is clicked
    const handleViewDetails = (resume) => {
        setSelectedResume(resume); // Set the selected resume to show full details
    };

    // Function to go back to the resume list view
    const handleBackToList = () => {
        setSelectedResume(null); // Reset to show the list again
    };

    return (
        <div style={styles.container}>
            <div style={styles.sidebar}>
                <h2 style={styles.sidebarTitle}>Filters</h2>
                {/* Gender Filter */}
                <div style={styles.filterSection}>
                    <label style={styles.filterLabel}>Gender:</label>
                    <select style={styles.filterSelect} value={genderFilter} onChange={handleGenderChange}>
                        <option value="">All</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                {/* Work Record Filter */}
                <div style={styles.filterSection}>
                    <label style={styles.filterLabel}>
                        <input
                            type="checkbox"
                            checked={workRecordFilter}
                            onChange={handleWorkRecordChange}
                        />
                        Have Work Record
                    </label>
                </div>
                {/* Age Filter */}
                <div style={styles.filterSection}>
                    <label style={styles.filterLabel}>Age Range:</label>
                    <input
                        type="number"
                        placeholder="Min Age"
                        value={minAge}
                        onChange={(e) => handleAgeChange(e, 'min')}
                        style={styles.filterInput}
                    />
                    <input
                        type="number"
                        placeholder="Max Age"
                        value={maxAge}
                        onChange={(e) => handleAgeChange(e, 'max')}
                        style={styles.filterInput}
                    />
                </div>
                {/* Company Filter */}
                <div style={styles.filterSection}>
                    <label style={styles.filterLabel}>Company:</label>
                    <input
                        type="text"
                        placeholder="Search by company"
                        value={companyFilter}
                        onChange={handleCompanyChange}
                        style={styles.filterInput}
                    />
                </div>
                {/* Position Filter */}
                <div style={styles.filterSection}>
                    <label style={styles.filterLabel}>Position:</label>
                    <input
                        type="text"
                        placeholder="Search by position"
                        value={positionFilter}
                        onChange={handlePositionChange}
                        style={styles.filterInput}
                    />
                </div>
                {/* Skills Filter */}
                <div style={styles.filterSection}>
                    <label style={styles.filterLabel}>Skills (Programming Languages):</label>
                    <input
                        type="text"
                        placeholder="Search by skills (e.g., JavaScript)"
                        value={skillFilter}
                        onChange={handleSkillChange}
                        style={styles.filterInput}
                    />
                </div>
            </div>
            {selectedResume ? (
                // Display full details of the selected resume
                <div style={styles.resumeDetails}>
                    <h2>{selectedResume.name}</h2>
                    <p><strong>Age:</strong> {selectedResume.age}</p>
                    <p><strong>Gender:</strong> {selectedResume.gender}</p>
                    <p><strong>Work Record:</strong> {selectedResume.workRecord ? selectedResume.workRecord : 'No work record available'}</p>
                    <h3>Work Experience:</h3>
                    <ul>
                        {selectedResume.workExperience.map((exp, index) => (
                            <li key={index}>
                                <p><strong>Company:</strong> {exp.company}</p>
                                <p><strong>Position:</strong> {exp.position}</p>
                                <p><strong>Duration:</strong> {exp.duration}</p>
                            </li>
                        ))}
                    </ul>
                    <h3>Education:</h3>
                    <p><strong>Institution:</strong> {selectedResume.education.institution}</p>
                    <p><strong>Degree:</strong> {selectedResume.education.degree}</p>
                    <p><strong>Graduation Year:</strong> {selectedResume.education.graduationYear}</p>
                    <h3>Skills:</h3>
                    <ul>
                        {selectedResume.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                    <button style={styles.backButton} onClick={handleBackToList}>Back to List</button>
                </div>
            ) : (
                <div style={styles.mainContent}>
                    <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
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
                                    <button style={styles.viewButton} onClick={() => handleViewDetails(resume)}>View</button>
                                </div>
                            ))
                        ) : (
                            query && <p style={styles.noResults}>No results found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: '50px',
        alignItems: 'flex-start', // Ensures the sidebar only stretches as needed
    },
    sidebar: {
        width: '250px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRight: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)', // Adds subtle shadow for a cleaner look
        flexShrink: 0,
    },
    sidebarTitle: {
        marginBottom: '10px',
        fontSize: '18px',
        fontWeight: 'bold',
        color: 'blue', // Change the title color to blue
    },
    filterSection: {
        marginBottom: '15px',
    },
    filterLabel: {
        display: 'block',
        marginBottom: '5px',
        fontWeight: 'bold',
        color: 'blue', // Change text color to blue
    },
    filterSelect: {
        width: '100%',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        color: 'blue', // Change text color to blue
    },
    filterInput: {
        width: 'calc(100% - 10px)',
        padding: '8px',
        borderRadius: '4px',
        border: '1px solid #ccc',
        marginBottom: '10px',
        color: 'blue', // Change text color to blue
    },
    mainContent: {
        flex: 1,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
    resumeDetails: {
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'green', // Change background color to green
    },
    backButton: {
        padding: '10px 20px',
        marginTop: '20px',
        backgroundColor: '#4285f4',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    noResults: {
        color: '#ff0000',
        fontWeight: 'bold',
    },
};

export default SearchPage;
