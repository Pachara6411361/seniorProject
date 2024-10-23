import React, { useState, useEffect } from "react";
import {
  getSkills,
  addSkill,
  updateSkill,
  deleteSkill,
} from "../services/ApiClient";
import { FaEdit, FaTrash, FaSave } from "react-icons/fa";

const ManageSkillPage = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [editingSkill, setEditingSkill] = useState(null);
  const [editInput, setEditInput] = useState("");
  const [errorAdd, setErrorAdd] = useState("");
  const [errorEdit, setErrorEdit] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

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

  const handleAddSkill = async () => {
    if (newSkill.trim() === "") {
      setErrorAdd("Skill name cannot be empty.");
      return;
    }

    if (
      skills.some(
        (skill) =>
          skill.skill_name.toLowerCase() === newSkill.trim().toLowerCase()
      )
    ) {
      setErrorAdd("Skill name already exists.");
      return;
    }

    try {
      const result = await addSkill({ skill_name: newSkill.trim() });
      if (result.status_code === 201) {
        setSkills([...skills, result.data]);
        setNewSkill("");
        setErrorAdd("");
      } else if (result.status_code === 400) {
        setErrorAdd(result.status_message);
      }
    } catch (error) {
      console.error("Error adding skill:", error.message);
    }
  };

  const handleEditSkill = async () => {
    if (editInput.trim() === "") {
      setErrorEdit("Skill name cannot be empty.");
      return;
    }

    if (
      skills.some(
        (skill) =>
          skill.skill_name.toLowerCase() === editInput.trim().toLowerCase() &&
          skill.id !== editingSkill.id
      )
    ) {
      setErrorEdit("Skill name already exists.");
      return;
    }

    try {
      const result = await updateSkill(editingSkill.id, {
        skill_name: editInput.trim(),
      });
      if (result.status_code === 200) {
        const updatedSkills = skills.map((skill) =>
          skill.id === editingSkill.id ? result.data : skill
        );
        setSkills(updatedSkills);
        setEditingSkill(null);
        setEditInput("");
        setErrorEdit("");
      } else if (result.status_code === 400) {
        setErrorEdit(result.status_message);
      }
    } catch (error) {
      console.error("Error editing skill:", error.message);
    }
  };

  const handleDeleteSkill = async (id) => {
    try {
      const result = await deleteSkill(id);
      if (result.status_code === 200) {
        setSkills(skills.filter((skill) => skill.id !== id));
      }
    } catch (error) {
      console.error("Error deleting skill:", error.message);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <h1 style={styles.pageTitle}>Manage Skills</h1>
        <div style={styles.form}>
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add new skill"
            style={styles.input}
          />
          <button onClick={handleAddSkill} style={styles.button}>
            Add Skill
          </button>
        </div>
        {errorAdd && <p style={styles.error}>{errorAdd}</p>}
        <div style={styles.resultsContainer}>
          {skills.length > 0 ? (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>Skill Name</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill) => (
                  <tr key={skill.id}>
                    <td style={styles.tableCell}>
                      {editingSkill && editingSkill.id === skill.id ? (
                        <>
                          <input
                            value={editInput}
                            onChange={(e) => setEditInput(e.target.value)}
                            style={styles.input}
                          />
                          {errorEdit && <p style={styles.error}>{errorEdit}</p>}
                        </>
                      ) : (
                        skill.skill_name
                      )}
                    </td>
                    <td style={{ ...styles.tableCell, width: "25%" }}>
                      {editingSkill && editingSkill.id === skill.id ? (
                        <button
                          onClick={handleEditSkill}
                          style={{
                            ...styles.iconButton,
                            backgroundColor: "#32cd32",
                          }}
                        >
                          <FaSave size={20} />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingSkill(skill);
                            setEditInput(skill.skill_name);
                            setError("");
                          }}
                          style={styles.iconButton}
                        >
                          <FaEdit size={20} />
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSkill(skill.id)}
                        style={{ ...styles.iconButton, backgroundColor: "red" }}
                      >
                        <FaTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p style={styles.noResults}>No skills data</p>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
  },
  mainContent: {
    flex: 1,
    padding: "5vw",
    maxWidth: "80%",
    minWidth: "50%",
    backgroundColor: "#0a1f44",
    borderRadius: "8px",
  },
  pageTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "white",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "1rem",
    margin: "10px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "1rem",
    boxSizing: "border-box",
  },
  button: {
    width: "250px",
    padding: "1rem",
    margin: "10px 0 10px 10px",
    backgroundColor: "#4285f4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    fontSize: "1rem",
    cursor: "pointer",
  },
  iconButton: {
    padding: "10px",
    margin: "0 5px",
    border: "none",
    backgroundColor: "#4285f4",
    color: "white",
    cursor: "pointer",
    borderRadius: "4px",
  },
  error: {
    color: "red",
    marginTop: "5px",
  },
  resultsContainer: {
    marginTop: "20px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    padding: "30px",
    border: "1px solid rgb(204, 204, 204)",
    borderRadius: "8px",
    marginTop: "30px",
    backgroundColor: "white",
    color: "rgb(255, 255, 255)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  tableHeader: {
    backgroundColor: "#27476d",
    color: "#fff",
    padding: "10px",
    border: "1px solid #fff",
  },
  tableCell: {
    padding: "10px",
    border: "1px solid #ccc",
    color: "black",
    textAlign: "center",
  },
  noResults: {
    color: "white",
  },
};

export default ManageSkillPage;
