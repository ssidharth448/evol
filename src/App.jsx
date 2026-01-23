import { useState, useEffect } from "react";
import WordCard from "./components/WordCard";

function App() {
  // Load words from localStorage if any
  const [words, setWords] = useState(() => {
    const saved = localStorage.getItem("words");
    return saved ? JSON.parse(saved) : [];
  });

  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");

  // Save words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const handleAddWord = (e) => {
    e.preventDefault();
    if (!newWord) return;

    setWords([...words, { word: newWord, meaning: newMeaning }]);
    setNewWord("");
    setNewMeaning("");
  };

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "'Courier New', Courier, monospace",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center" }}>evol</h1>
      <p style={{ textAlign: "center" }}>Collect words you love</p>

      {/* Form */}
      <form
        onSubmit={handleAddWord}
        style={{ textAlign: "center", margin: "2rem 0" }}
      >
        <input
          type="text"
          placeholder="Word"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Meaning"
          value={newMeaning}
          onChange={(e) => setNewMeaning(e.target.value)}
          style={{ marginRight: "0.5rem", padding: "0.5rem" }}
        />
        <button type="submit" style={{ padding: "0.5rem 1rem" }}>
          Add
        </button>
      </form>

      {/* Polaroid Cards */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {words.map((w, index) => (
          <WordCard key={index} {...w} />
        ))}
      </div>
    </div>
  );
}

export default App;


