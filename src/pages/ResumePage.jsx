import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { getProfileById, getSkills } from "../services/ApiClient";
import { useAuth } from "../hooks/AuthContext";
import { FaFilePdf } from "react-icons/fa";

const initialResumeData = {
  id: "",
  email: "",
  first_name: "",
  last_name: "",
  mobile_number: "",
  resume_url: "",
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
  const [isEditing, setIsEditing] = useState(false);
  const [availableSkills, setAvailableSkills] = useState([]);
  const { userId } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchProfileData(userId);
      fetchAvailableSkills();
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

  const fetchAvailableSkills = async () => {
    try {
      const result = await getSkills();
      if (result.status_code === 200) {
        setAvailableSkills(result.data);
      }
    } catch (error) {
      console.error("Error fetching skills:", error.message);
    }
  };

  const mapResumeData = (data) => {
    return {
      id: data?.id ?? "",
      email: data?.email ?? "",
      first_name: data?.first_name ?? "",
      last_name: data?.last_name ?? "",
      mobile_number: data?.mobile_number ?? "",
      resume_url: data?.resume_url ?? "",
      profile: {
        name: data?.profile?.name ?? "",
        email: data?.profile?.email ?? "",
        mobile_number: data?.profile?.mobile_number ?? "",
        skills: data?.profile?.skills ?? [],
        college_name: data?.profile?.college_name ?? "",
        degree: data?.profile?.degree ?? "",
        designation: data?.profile?.designation ?? [],
        experience: data?.profile?.experience ?? [],
        company_names: data?.profile?.company_names ?? "",
        no_of_pages: data?.profile?.no_of_pages ?? 0,
        total_experience: data?.profile?.total_experience ?? 0.0,
      },
    };
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleExperienceChange = (index, value) => {
    const newExperience = [...resumeData.profile.designation];
    newExperience[index] = value;
    setResumeData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, designation: newExperience },
    }));
  };

  const addExperience = () => {
    setResumeData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        designation: [...prevData.profile.designation, ""],
      },
    }));
  };

  const removeExperience = (index) => {
    const newExperience = resumeData.profile.designation.filter(
      (_, i) => i !== index
    );
    setResumeData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, designation: newExperience },
    }));
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...resumeData.profile.skills];
    newSkills[index] = value;
    setResumeData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, skills: newSkills },
    }));
  };

  const addSkill = () => {
    setResumeData((prevData) => ({
      ...prevData,
      profile: {
        ...prevData.profile,
        skills: [...prevData.profile.skills, ""],
      },
    }));
  };

  const removeSkill = (index) => {
    const newSkills = resumeData.profile.skills.filter((_, i) => i !== index);
    setResumeData((prevData) => ({
      ...prevData,
      profile: { ...prevData.profile, skills: newSkills },
    }));
  };

  const handleSave = () => {
    console.log("Save resume data", resumeData);
    setIsEditing(false);
  };

  return (
    <ResumeContainer>
      <IconContainer>
        {resumeData.resume_url && (
          <PdfButton
            href={resumeData.resume_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFilePdf size={30} />
          </PdfButton>
        )}
      </IconContainer>
      <Title>Resume</Title>

      {isEditing ? (
        <form onSubmit={(e) => e.preventDefault()}>
          <Section>
            <SectionTitle>Personal Details</SectionTitle>
            <DisplayContainer>
              <strong>First Name:</strong>
              <InputField
                name="first_name"
                value={resumeData.first_name}
                onChange={handleInputChange}
              />
              <strong>Last Name:</strong>
              <InputField
                name="last_name"
                value={resumeData.last_name}
                onChange={handleInputChange}
              />
              <strong>Email:</strong>
              <InputField
                name="email"
                value={resumeData.email}
                onChange={handleInputChange}
              />
              <strong>Mobile No:</strong>
              <InputField
                name="mobile_number"
                value={resumeData.mobile_number}
                onChange={handleInputChange}
              />
            </DisplayContainer>
          </Section>

          <Section>
            <SectionTitle>Work Experience</SectionTitle>
            {resumeData.profile.designation.map((exp, index) => (
              <ListContainer key={index}>
                <InputField
                  placeholder="Role"
                  value={exp}
                  onChange={(e) =>
                    handleExperienceChange(index, e.target.value)
                  }
                />
                <ButtonContainer>
                  <Button onClick={() => removeExperience(index)}>
                    Remove Experience
                  </Button>
                </ButtonContainer>
              </ListContainer>
            ))}
            <ButtonContainer>
              <Button onClick={addExperience}>Add Experience</Button>
            </ButtonContainer>
          </Section>

          <Section>
            <SectionTitle>Education</SectionTitle>
            <DisplayContainer>
              <strong>Institution:</strong>
              <InputField
                name="college_name"
                value={resumeData.profile.college_name}
                onChange={handleInputChange}
              />
              <strong>Degree:</strong>
              <InputField
                name="degree"
                value={resumeData.profile.degree}
                onChange={handleInputChange}
              />
            </DisplayContainer>
          </Section>

          <Section>
            <SectionTitle>Skills</SectionTitle>
            {resumeData.profile.skills.map((skill, index) => (
              <ListContainer key={index}>
                <InputField
                  placeholder="Skill Name"
                  value={skill}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                />
                <ButtonContainer>
                  <Button onClick={() => removeSkill(index)}>
                    Remove Skill
                  </Button>
                </ButtonContainer>
              </ListContainer>
            ))}
            <ButtonContainer>
              <Button onClick={addSkill}>Add Skill</Button>
            </ButtonContainer>
          </Section>

          <ButtonContainer>
            <Button onClick={handleSave}>Save</Button>
          </ButtonContainer>
        </form>
      ) : (
        <>
          <Section>
            <SectionTitle>Personal Details</SectionTitle>
            <DisplayContainer>
              <p>
                <strong>Name:</strong>{" "}
                {resumeData.first_name && resumeData.last_name
                  ? resumeData.first_name + " " + resumeData.last_name
                  : "-"}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {resumeData.email ? resumeData.email : "-"}
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                {resumeData.mobile_number ? resumeData.mobile_number : "-"}
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
              <p>
                <strong>Institution:</strong>{" "}
                {resumeData.profile.college_name
                  ? resumeData.profile.college_name
                  : "-"}
              </p>
              <p>
                <strong>Degree:</strong>{" "}
                {resumeData.profile.degree ? resumeData.profile.degree : "-"}
              </p>
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
            <Button onClick={handleEditToggle}>Edit</Button>
            <Button onClick={() => navigate("/upload")}>Re-upload</Button>
          </ButtonContainer>
        </>
      )}
    </ResumeContainer>
  );
};

export default ResumePage;

// Set all text components to green
const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

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
  width: 250px;
  margin: 10px;

  &:hover {
    background-color: #357ae8;
  }
`;

const PdfButton = styled.a`
  background-color: transparent;
  border: none;
  color: red; /* Icon color */
  cursor: pointer;
  position: relative; /* Make the tooltip relative to the button */

  &:hover {
    color: darkred; /* Change color on hover */
  }

  /* Tooltip styling */
  &:hover::after {
    content: "View Original Resume PDF"; /* Text for the tooltip */
    position: absolute;
    top: -35px; /* Position the tooltip above the icon */
    right: 50%;
    transform: translateX(50%);
    background-color: #333;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 0.9rem;
    white-space: nowrap;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  /* Hide the tooltip by default */
  &::after {
    content: "";
    position: absolute;
    opacity: 0;
    pointer-events: none;
  }
`;

const InputField = styled.input`
  padding: 1rem;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  font-size: 1rem;
  box-sizing: border-box;
`;

const ListContainer = styled.div`
  margin-bottom: 20px;
`;
