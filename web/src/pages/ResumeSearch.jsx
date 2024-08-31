import React, { useState } from 'react';

const ResumeSearch = ({ resumes }) => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [workRecord, setWorkRecord] = useState('');
  const [filteredResumes, setFilteredResumes] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();

    const results = resumes.filter((resume) => {
      return (
        (!age || resume.age === parseInt(age)) &&
        (!gender || resume.gender.toLowerCase() === gender.toLowerCase()) &&
        (!workRecord || resume.workRecord.toLowerCase().includes(workRecord.toLowerCase()))
      );
    });

    setFilteredResumes(results);
  };

  return (
    <div>
      <h2>Search Resumes</h2>
      <form onSubmit={handleSearch}>
        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Enter age"
          />
        </div>
        <div>
          <label>Gender:</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Work Record:</label>
          <input
            type="text"
            value={workRecord}
            onChange={(e) => setWorkRecord(e.target.value)}
            placeholder="Enter work record"
          />
        </div>
        <button type="submit">Search</button>
      </form>

      <div>
        <h3>Search Results</h3>
        {filteredResumes.length > 0 ? (
          filteredResumes.map((resume, index) => (
            <div key={index}>
              <p><strong>Name:</strong> {resume.name}</p>
              <p><strong>Age:</strong> {resume.age}</p>
              <p><strong>Gender:</strong> {resume.gender}</p>
              <p><strong>Work Record:</strong> {resume.workRecord}</p>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default ResumeSearch;
