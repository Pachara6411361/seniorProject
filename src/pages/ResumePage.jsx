import React, { useState } from "react";
import styled from "styled-components";

const initialResumeData = {
  personalDetails: {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
  },
  workExperience: [
    {
      company: "Company A",
      position: "Software Engineer",
      duration: "2019 - 2022",
      description: "Worked on various web applications.",
    },
    {
      company: "Company B",
      position: "Junior Developer",
      duration: "2017 - 2019",
      description: "Assisted in developing e-commerce platforms.",
    },
  ],
  education: [
    {
      institution: "University X",
      degree: "B.Sc. in Computer Science",
      graduationYear: "2017",
    },
  ],
  skills: ["JavaScript", "React", "Node.js", "CSS"],
};

const ResumePage = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e, section, index = null, field = null) => {
    const value = e.target.value;
    const updatedResume = { ...resumeData };

    if (index !== null && field !== null) {
      updatedResume[section][index][field] = value;
    } else {
      updatedResume[section] = { ...updatedResume[section], [e.target.name]: value };
    }

    setResumeData(updatedResume);
  };

  const toggleEditing = () => setIsEditing(!isEditing);

  const saveResumeData = () => {
    console.log("Resume Data Saved:", resumeData);
    toggleEditing();
  };

  return (
    <ResumeContainer>
      <Title>Resume</Title>

      <Section>
        <SectionTitle>Personal Details</SectionTitle>
        {isEditing ? (
          <EditContainer>
            <label>Name: </label>
            <input
              type="text"
              name="name"
              value={resumeData.personalDetails.name}
              onChange={(e) => handleInputChange(e, "personalDetails")}
            />
            <label>Email: </label>
            <input
              type="email"
              name="email"
              value={resumeData.personalDetails.email}
              onChange={(e) => handleInputChange(e, "personalDetails")}
            />
            <label>Phone: </label>
            <input
              type="tel"
              name="phone"
              value={resumeData.personalDetails.phone}
              onChange={(e) => handleInputChange(e, "personalDetails")}
            />
          </EditContainer>
        ) : (
          <DisplayContainer>
            <p><strong>Name:</strong> {resumeData.personalDetails.name}</p>
            <p><strong>Email:</strong> {resumeData.personalDetails.email}</p>
            <p><strong>Phone:</strong> {resumeData.personalDetails.phone}</p>
          </DisplayContainer>
        )}
      </Section>

      <Section>
        <SectionTitle>Work Experience</SectionTitle>
        {resumeData.workExperience.map((job, index) => (
          <WorkItem key={index}>
            {isEditing ? (
              <>
                <label>Company: </label>
                <input
                  type="text"
                  value={job.company}
                  onChange={(e) => handleInputChange(e, "workExperience", index, "company")}
                />
                <label>Position: </label>
                <input
                  type="text"
                  value={job.position}
                  onChange={(e) => handleInputChange(e, "workExperience", index, "position")}
                />
                <label>Duration: </label>
                <input
                  type="text"
                  value={job.duration}
                  onChange={(e) => handleInputChange(e, "workExperience", index, "duration")}
                />
                <label>Description: </label>
                <input
                  type="text"
                  value={job.description}
                  onChange={(e) => handleInputChange(e, "workExperience", index, "description")}
                />
              </>
            ) : (
              <>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Position:</strong> {job.position}</p>
                <p><strong>Duration:</strong> {job.duration}</p>
                <p><strong>Description:</strong> {job.description}</p>
              </>
            )}
          </WorkItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Education</SectionTitle>
        {resumeData.education.map((edu, index) => (
          <EducationItem key={index}>
            {isEditing ? (
              <>
                <label>Institution: </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) => handleInputChange(e, "education", index, "institution")}
                />
                <label>Degree: </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) => handleInputChange(e, "education", index, "degree")}
                />
                <label>Graduation Year: </label>
                <input
                  type="text"
                  value={edu.graduationYear}
                  onChange={(e) => handleInputChange(e, "education", index, "graduationYear")}
                />
              </>
            ) : (
              <>
                <p><strong>Institution:</strong> {edu.institution}</p>
                <p><strong>Degree:</strong> {edu.degree}</p>
                <p><strong>Graduation Year:</strong> {edu.graduationYear}</p>
              </>
            )}
          </EducationItem>
        ))}
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        {isEditing ? (
          <EditContainer>
            {resumeData.skills.map((skill, index) => (
              <input
                key={index}
                type="text"
                value={skill}
                onChange={(e) => handleInputChange(e, "skills", index)}
              />
            ))}
          </EditContainer>
        ) : (
          <ul>
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        )}
      </Section>

      <ButtonContainer>
        {isEditing ? (
          <Button onClick={saveResumeData}>Save</Button>
        ) : (
          <Button onClick={toggleEditing}>Edit</Button>
        )}
      </ButtonContainer>
    </ResumeContainer>
  );
};

export default ResumePage;

// Set all text components to green

const ResumeContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: green; /* Ensure all text inside this container is green */
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  color: green; /* Title in green */
  margin-bottom: 20px;
`;

const Section = styled.div`
  margin-bottom: 30px;
  color: green; /* Ensure section text is green */
`;

const SectionTitle = styled.h2`
  font-size: 1.8rem;
  color: green; /* Section title in green */
  margin-bottom: 10px;
  border-bottom: 2px solid #4285f4;
  padding-bottom: 5px;
`;

const DisplayContainer = styled.div`
  font-size: 1.1rem;
  color: green; /* All text inside this display container should be green */
  p {
    margin: 5px 0;
    color: green; /* Paragraph text in green */
  }

  strong {
    color: green; /* Ensure strong elements are green */
  }
`;

const WorkItem = styled.div`
  margin-bottom: 20px;
  color: green; /* Ensure work items are green */
  p {
    margin: 5px 0;
    color: green; /* Paragraph text inside work items in green */
  }
`;

const EducationItem = styled.div`
  margin-bottom: 20px;
  color: green; /* Education items in green */
  p {
    margin: 5px 0;
    color: green; /* Paragraph text inside education items in green */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #357ae8;
  }
`;
