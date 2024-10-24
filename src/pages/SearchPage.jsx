import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfiles, getSkills } from "../services/ApiClient";

const SearchPage = () => {
  const [resumes, setResumes] = useState([]);
  const [query, setQuery] = useState("");
  const [skills, setSkills] = useState([]);
  const [filterSkills, setFilterSkills] = useState([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfilesData();
    fetchSkills();
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

  const fetchSkills = async () => {
    try {
      const result = await getSkills();
      if (result.status_code === 200) {
        setSkills(result.data);
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
    const trimmedQuery = query.trim();
    setQuery(trimmedQuery);
    setFilterSkills(
      trimmedQuery ? trimmedQuery.split(",").map((skill) => skill.trim()) : []
    );

    await fetchProfilesData();
  };

  const highlightText = (text, search) => {
    if (!search) return text;

    const searchTerms = search
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean);

    const regex = new RegExp(`(${searchTerms.join("|")})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) =>
      searchTerms.includes(part.toLowerCase()) ? (
        <span key={index} style={styles.skillHighlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleSkillChange = (skillName) => {
    if (!filterSkills.includes(skillName)) {
      setFilterSkills((prevData) => [...prevData, skillName]);
    }
  };

  const removeSkill = (skillName) => {
    const newSkills = filterSkills.filter((skill) => skill !== skillName);
    setFilterSkills((_) => [...newSkills]);
  };

  const handleApplyFilter = async () => {
    const newQuery = filterSkills.join(", ");
    setQuery(newQuery);
    await fetchProfilesData();
    toggleFilterVisibility();
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <form onSubmit={handleSearch} style={styles.form}>
          <input
            name="search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search skills (e.g. JavaScript, HTML, CSS)"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Search
          </button>
          <button onClick={toggleFilterVisibility} style={styles.button}>
            {isFilterVisible ? "Hide Filter" : "Show Filter"}
          </button>
        </form>

        {isFilterVisible && (
          <div style={styles.filterContainer}>
            <h3 style={styles.filterTitle}>{"Skill Filter"}</h3>
            <div style={styles.skillListContainer}>
              {skills.map((skill, index) => (
                <div style={styles.skillItem} key={index}>
                  <input
                    style={styles.checkbox}
                    type="checkbox"
                    id={`skill-${index}`}
                    checked={filterSkills.some(
                      (fSkill) =>
                        fSkill.toLowerCase() === skill.skill_name.toLowerCase()
                    )}
                    onChange={(e) => {
                      if (e.target.checked) {
                        // Add skill if checked
                        handleSkillChange(skill.skill_name);
                      } else {
                        // Remove skill if unchecked
                        removeSkill(skill.skill_name);
                      }
                    }}
                  />
                  <label htmlFor={`skill-${index}`} style={styles.skillLabel}>
                    {skill.skill_name}
                  </label>
                </div>
              ))}
            </div>
            <div style={styles.buttonContainer}>
              <button
                style={styles.applyFilterButton}
                onClick={handleApplyFilter}
              >
                Apply Filter
              </button>
            </div>
          </div>
        )}

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
    margin: "10px 0px 10px 10px",
    padding: "12px 20px",
    fontSize: "16px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#4285f4",
    color: "#fff",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    width: "250px",
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
  applyFilterButton: {
    padding: "8px 16px",
    backgroundColor: "#fff",
    color: "green",
    border: "1px solid green",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
    fontWeight: "bold",
    margin: "20px",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
  filterTitle: {
    margin: "20px",
    color: "green",
  },
  skillHighlight: { fontWeight: "bold", color: "#fff", background: "#4285f4" },
  filterContainer: {
    borderRadius: "8px",
    border: "1px solid #ddd",
    backgroundColor: "rgb(245, 245, 245)",
    width: "100%",
  },
  skillListContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "15px",
    margin: "20px",
    padding: "0",
  },
  skillItem: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
  },
  skillLabel: {
    cursor: "pointer",
    fontSize: "1rem",
    color: "green",
  },
  checkbox: {
    marginRight: "10px",
    width: "20px",
    height: "20px",
    cursor: "pointer",
  },
  toggleButton: {
    padding: "10px 15px",
    margin: "10px 0",
    backgroundColor: "#4285f4",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default SearchPage;
