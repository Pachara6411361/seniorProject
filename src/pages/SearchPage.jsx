import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles } from "../services/ApiClient";

const SearchPage = () => {
  const [resumes, setResumes] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfilesData();
  }, []);

  const fetchProfilesData = async () => {
    try {
      const result = await getProfiles(query.trim());

      if (result.status_code === 200) {
        const mappedResumes = result.data
          .filter((resume) => resume.profile !== null)
          .map((resume) => mapResumeData(resume));
        setResumes(mappedResumes);
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

  const handleSearch = async (e) => {
    e.preventDefault();
    setQuery(query.trim());
    await fetchProfilesData();
  };

  const highlightText = (text, search) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={styles.skillHighlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <form onSubmit={handleSearch} style={styles.form}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by skill..."
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Search
          </button>
        </form>
        <div style={styles.resultsContainer}>
          {resumes.length > 0 ? (
            resumes.map((resume, index) => (
              <div key={index} style={styles.resultItem}>
                <h3 style={styles.resultTitle}>
                  {resume.first_name + " " + resume.last_name}
                </h3>
                <p>
                  <strong>Email:</strong> {resume.email}
                </p>
                <p>
                  <strong>Phone:</strong> {resume.mobile_number}
                </p>
                <p>
                  <strong>Skills: </strong>
                  {resume.profile.skills.map((skill, index) => (
                    <span key={index}>
                      {highlightText(skill, query)}
                      {index < resume.profile.skills.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </p>
                <button
                  style={styles.viewButton}
                  onClick={() => navigate("/resume/detail/" + resume.id)}
                >
                  View
                </button>
              </div>
            ))
          ) : (
            <p style={styles.noResults}>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    paddingTop: "50px",
    alignItems: "flex-start", // Ensures the sidebar only stretches as needed
  },
  sidebar: {
    width: "250px",
    padding: "20px",
    backgroundColor: "#f8f9fa",
    borderRight: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)", // Adds subtle shadow for a cleaner look
    flexShrink: 0,
  },
  sidebarTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "blue", // Change the title color to blue
  },
  filterSection: {
    marginBottom: "15px",
  },
  filterLabel: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "bold",
    color: "blue", // Change text color to blue
  },
  filterSelect: {
    width: "100%",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    color: "blue", // Change text color to blue
  },
  filterInput: {
    width: "calc(100% - 10px)",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    color: "blue", // Change text color to blue
  },
  mainContent: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
    width: "100%",
    maxWidth: "600px",
  },
  input: {
    width: "100%",
    padding: "12px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    outline: "none",
  },
  button: {
    marginLeft: "10px",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4285f4",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  resultsContainer: {
    width: "100%",
    maxWidth: "600px",
    marginTop: "20px",
  },
  resultItem: {
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "10px",
    backgroundColor: "green",
    color: "#fff",
    transition: "transform 0.2s",
  },
  resultTitle: {
    marginBottom: "10px",
    color: "#fff",
  },
  viewButton: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "green",
    border: "1px solid green",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
  },
  resumeDetails: {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "green", // Change background color to green
  },
  backButton: {
    padding: "10px 20px",
    marginTop: "20px",
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  noResults: {
    color: "#ffffff",
    fontWeight: "bold",
  },
  skillHighlight: { fontWeight: "bold", color:"#fff", background:"black" },
};

export default SearchPage;
