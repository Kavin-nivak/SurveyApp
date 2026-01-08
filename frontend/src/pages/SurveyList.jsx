import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";
import styles from "../styles/SurveyList.module.css"; 

export default function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  const loadSurveys = () => {
    api.get("/surveys").then((res) => setSurveys(res.data));
  };

  useEffect(() => {
    loadSurveys();
  }, []);

  const deleteSurvey = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/surveys/${id}`);
      setSurveys((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Available Surveys</h2>

      {surveys.length === 0 && <p>No surveys found</p>}

      {surveys.map((s) => (
        <div key={s._id} className={styles.card}>
          <h4 className={styles.cardTitle}>{s.title}</h4>

          <div className={styles.actions}>
            <Link to={`/fill/${s._id}`}>Fill Survey</Link>
            <Link to={`/dashboard/${s._id}`}>View Results</Link>

            <button onClick={() => deleteSurvey(s._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
