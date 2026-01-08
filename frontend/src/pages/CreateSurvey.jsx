import { useState } from "react";
import api from "../api/axios";
import styles from "../styles/CreateSurvey.module.css";

export default function CreateSurvey() {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions((prev) => [
      ...prev,
      { text: "", type: "text", options: [] }
    ]);
  };

  const updateQuestionText = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, text: value } : q
      )
    );
  };

  const updateQuestionType = (index, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === index ? { ...q, type: value, options: [] } : q
      )
    );
  };

  const addOption = (qIndex) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: [...q.options, ""] }
          : q
      )
    );
  };

  const updateOption = (qIndex, oIndex, value) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? {
              ...q,
              options: q.options.map((opt, j) =>
                j === oIndex ? value : opt
              )
            }
          : q
      )
    );
  };

  const createSurvey = async () => {
    if (!title.trim() || questions.length === 0) {
      alert("Add title and at least one question");
      return;
    }

    try {
      await api.post("/surveys", { title, questions });
      alert("Survey Created Successfully ");

      setTitle("");
      setQuestions([]);
    } catch (err) {
      console.error("Create survey error:", err);
      alert("Survey creation failed ");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Create Survey</h2>

      <input
        className={styles.titleInput}
        placeholder="Survey Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      {questions.map((q, i) => (
        <div className={styles.questionBox} key={i}>
          <input
            className={styles.questionInput}
            placeholder={`Question ${i + 1}`}
            value={q.text}
            onChange={(e) => updateQuestionText(i, e.target.value)}
          />

          <select
            className={styles.select}
            value={q.type}
            onChange={(e) => updateQuestionType(i, e.target.value)}
          >
            <option value="text">Short Answer</option>
            <option value="mcq">Multiple Choice</option>
          </select>

          {q.type === "mcq" && (
            <>
              {q.options.map((opt, j) => (
                <input
                  key={j}
                  className={styles.optionInput}
                  placeholder={`Option ${j + 1}`}
                  value={opt}
                  onChange={(e) =>
                    updateOption(i, j, e.target.value)
                  }
                />
              ))}
              <button
                className={styles.button}
                onClick={() => addOption(i)}
              >
                + Option
              </button>
            </>
          )}
        </div>
      ))}

      <div className={styles.actions}>
        <button className={styles.button} onClick={addQuestion}>
          + Question
        </button>
        <button className={styles.button} onClick={createSurvey}>
          Create Survey
        </button>
      </div>
    </div>
  );
}
