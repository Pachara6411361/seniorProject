import React from "react";
import { Container, Col, Image } from "react-bootstrap";
import resumeImage from "../assets/resume-image.jpg";

const HomePage = () => {
  return (
    <Container
      fluid
      style={{
        padding:"50px",
        height: "100vh",
        display: "flex",
      }}
    >
      {/* Left Column */}
      <Col
        md={6}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Image
          src={resumeImage}
          alt="Resume Extraction Illustration"
          fluid
          style={{
            maxWidth: "80%",
            borderRadius: "8px",
          }}
        />
      </Col>

      {/* Right Column */}
      <Col
        md={6}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <h1>CV Query: a tool for HR Application</h1>
        <p>
          Welcome to our CV Query: a tool for HR App, where advanced algorithms help
          to extract and organize key information from resumes. Our system
          efficiently handles the extraction of skills, experience, education,
          and more, making the recruitment process faster and easier.
        </p>
        <p>
          This application is designed for recruiters, and job seekers who need
          structured resume data to streamline the job application process.
        </p>
      </Col>
    </Container>
  );
};

export default HomePage;
