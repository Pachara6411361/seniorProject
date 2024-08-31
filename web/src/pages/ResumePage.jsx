import React, { useState } from "react";

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
        // You can add logic here to save the data, e.g., making an API call
        console.log("Resume Data Saved:", resumeData);
        toggleEditing();
    };

    return (
        <div>
            <h1>Resume</h1>
            <section>
                <h2>Personal Details</h2>
                {isEditing ? (
                    <div>
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
                    </div>
                ) : (
                    <div>
                        <p>Name: {resumeData.personalDetails.name}</p>
                        <p>Email: {resumeData.personalDetails.email}</p>
                        <p>Phone: {resumeData.personalDetails.phone}</p>
                    </div>
                )}
            </section>

            <section>
                <h2>Work Experience</h2>
                {resumeData.workExperience.map((job, index) => (
                    <div key={index}>
                        {isEditing ? (
                            <>
                                <label>Company: </label>
                                <input
                                    type="text"
                                    value={job.company}
                                    onChange={(e) =>
                                        handleInputChange(e, "workExperience", index, "company")
                                    }
                                />
                                <label>Position: </label>
                                <input
                                    type="text"
                                    value={job.position}
                                    onChange={(e) =>
                                        handleInputChange(e, "workExperience", index, "position")
                                    }
                                />
                                <label>Duration: </label>
                                <input
                                    type="text"
                                    value={job.duration}
                                    onChange={(e) =>
                                        handleInputChange(e, "workExperience", index, "duration")
                                    }
                                />
                                <label>Description: </label>
                                <input
                                    type="text"
                                    value={job.description}
                                    onChange={(e) =>
                                        handleInputChange(e, "workExperience", index, "description")
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <p>Company: {job.company}</p>
                                <p>Position: {job.position}</p>
                                <p>Duration: {job.duration}</p>
                                <p>Description: {job.description}</p>
                            </>
                        )}
                    </div>
                ))}
            </section>

            <section>
                <h2>Education</h2>
                {resumeData.education.map((edu, index) => (
                    <div key={index}>
                        {isEditing ? (
                            <>
                                <label>Institution: </label>
                                <input
                                    type="text"
                                    value={edu.institution}
                                    onChange={(e) =>
                                        handleInputChange(e, "education", index, "institution")
                                    }
                                />
                                <label>Degree: </label>
                                <input
                                    type="text"
                                    value={edu.degree}
                                    onChange={(e) =>
                                        handleInputChange(e, "education", index, "degree")
                                    }
                                />
                                <label>Graduation Year: </label>
                                <input
                                    type="text"
                                    value={edu.graduationYear}
                                    onChange={(e) =>
                                        handleInputChange(e, "education", index, "graduationYear")
                                    }
                                />
                            </>
                        ) : (
                            <>
                                <p>Institution: {edu.institution}</p>
                                <p>Degree: {edu.degree}</p>
                                <p>Graduation Year: {edu.graduationYear}</p>
                            </>
                        )}
                    </div>
                ))}
            </section>

            <section>
                <h2>Skills</h2>
                {isEditing ? (
                    <div>
                        {resumeData.skills.map((skill, index) => (
                            <input
                                key={index}
                                type="text"
                                value={skill}
                                onChange={(e) =>
                                    handleInputChange(e, "skills", index)
                                }
                            />
                        ))}
                    </div>
                ) : (
                    <ul>
                        {resumeData.skills.map((skill, index) => (
                            <li key={index}>{skill}</li>
                        ))}
                    </ul>
                )}
            </section>

            {isEditing ? (
                <button onClick={saveResumeData}>Save</button>
            ) : (
                <button onClick={toggleEditing}>Edit</button>
            )}
        </div>
    );
};

export default ResumePage;
