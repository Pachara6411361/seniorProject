import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getProfileById } from "../services/ApiClient";
import { useAuth } from "../hooks/AuthContext";

const initialResumeData = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  mobile_number: "",
  profile: {
    name: "",
    email: "",
    mobile_number: "",
    skills: [],
    college_name: "",
    degree: "",
    designation: [],
    experience: [],
    company_names: "",
    no_of_pages: 0,
    total_experience: 0.0,
  },
};

const ResumePage = () => {
  const [resumeData, setResumeData] = useState(initialResumeData);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
    }
  }, [userId]);

  const fetchProfileData = async (userId) => {
    try {
      const result = await getProfileById(userId);

      if (result.status_code === 200 && result.data.profile !== null) {
        setResumeData(mapResumeData(result.data));
      } else {
        navigate("/upload");
      }
    } catch (error) {
      console.error("Error fetch profile data:", error.message);
    }
  };

  const mapResumeData = (data) => {
    return {
      id: data?.id ?? "",
      email: data?.email ?? "",
      first_name: data?.first_name ?? "",
      last_name: data?.last_name ?? "",
      mobile_number: data?.mobile_number ?? "",
      profile: {
        name: data?.profile?.name ?? "-",
        email: data?.profile?.email ?? "-",
        mobile_number: data?.profile?.mobile_number ?? "-",
        skills: data?.profile?.skills ?? [],
        college_name: data?.profile?.college_name ?? "-",
        degree: data?.profile?.degree ?? "-",
        designation: data?.profile?.designation ?? [],
        experience: data?.profile?.experience ?? [],
        company_names: data?.profile?.company_names ?? "-",
        no_of_pages: data?.profile?.no_of_pages ?? 0,
        total_experience: data?.profile?.total_experience ?? 0.0,
      },
    };
  };

  return (
    <ResumeContainer>
      <Title>Resume</Title>

      <Section>
        <SectionTitle>Personal Details</SectionTitle>
        <DisplayContainer>
          <p>
            <strong>Name:</strong>{" "}
            {resumeData.first_name + " " + resumeData.last_name}
          </p>
          <p>
            <strong>Email:</strong> {resumeData.email}
          </p>
          <p>
            <strong>Phone:</strong> {resumeData.mobile_number}
          </p>
        </DisplayContainer>
      </Section>

      {resumeData.profile.designation.length > 0 && (
        <Section>
          <SectionTitle>Work Experience</SectionTitle>
          <ul>
            {resumeData.profile.designation.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      <Section>
        <SectionTitle>Education</SectionTitle>
        <EducationItem>
          <>
            <p>
              <strong>Institution:</strong> {resumeData.profile.college_name}
            </p>
            <p>
              <strong>Degree:</strong> {resumeData.profile.degree}
            </p>
          </>
        </EducationItem>
      </Section>

      <Section>
        <SectionTitle>Skills</SectionTitle>
        <ul>
          {resumeData.profile.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </Section>

      <ButtonContainer>
        <Button onClick={() => navigate("/upload")}>Re-upload</Button>
      </ButtonContainer>
    </ResumeContainer>
  );
};

export default ResumePage;

// Set all text components to green

const ResumeContainer = styled.div`
  padding: 40px;
  max-width: 800px;
  margin: 60px auto 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  color: green; /* Ensure all text inside this container is green */
  box-sizing: border-box;
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
