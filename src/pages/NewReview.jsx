import { useState } from "react";
import Editor from "@monaco-editor/react";
import { useNavigate } from "react-router-dom";
import { submitReview } from "../services/api";
import TopNav from "../components/TopNav";
import styles from "./NewReview.module.css";

const LANGUAGES = ["auto", "java", "python", "javascript", "typescript", "cpp"];

export default function NewReview() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("auto");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit() {
    if (!code.trim()) {
      setError("Paste some code before submitting.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      const result = await submitReview(code, language);
      navigate(`/reviews/${result.id}`);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "The review could not be completed. Try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setCode(e.target.result);
    };
    reader.readAsText(file);
  }

  return (
    <div className={styles.page}>
      <TopNav />
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.title}>Submit for review</h1>
          <select
            className={styles.langSelect}
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang === "auto" ? "Auto-detect language" : lang}
              </option>
            ))}
          </select>
        </div>

        <input
          type="file"
          accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.txt"
          onChange={handleFileUpload}
          style={{ marginBottom: "12px", color: "var(--text-ink-dim)" }}
        />

        <div className={styles.editorFrame}>
          <Editor
            height="520px"
            language={language === "auto" ? "plaintext" : language}
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: "JetBrains Mono, monospace",
              padding: { top: 16 },
            }}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={submitting}
        >
          {submitting ? "Reviewing…" : "Submit for review"}
        </button>
      </div>
    </div>
  );
}
