import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/axios";
import styles from "../styles/FillSurvey.module.css";

export default function FillSurvey() {
  const { id } = useParams();
  const [survey, setSurvey] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    api.get("/surveys").then((res) => {
      setSurvey(res.data.find((s) => s._id === id));
    });
  }, [id]);

  const handleAnswer = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const submit = async () => {
    await api.post(`/surveys/${id}/response`, { answers });
    alert("Submitted ");
  };

  if (!survey) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <h2>{survey.title}</h2>

      {survey.questions.map((q, i) => (
        <div key={i} className={styles.questionBox}>
          <p className={styles.questionText}>{q.text}</p>

          {q.type === "text" ? (
            <input
              onChange={(e) => handleAnswer(i, e.target.value)}
            />
          ) : (
            q.options.map((opt, j) => (
              <label key={j} className={styles.option}>
                <input
                  type="radio"
                  name={i}
                  onChange={() => handleAnswer(i, opt)}
                />
                {" "}{opt}
              </label>
            ))
          )}
        </div>
      ))}

      <button
        className={styles.submitButton}
        onClick={submit}
      >
        Submit
      </button>
    </div>
  );
}
