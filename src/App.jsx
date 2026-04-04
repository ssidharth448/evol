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

  const handleAddWord = async (e) => {
    e.preventDefault();
    if (!newWord) return;
  
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
      );
      const data = await res.json();
  
      const meaning =
        data[0]?.meanings[0]?.definitions[0]?.definition ||
        "No meaning found";
  
      setWords([...words, { word: newWord, meaning }]);
      setNewWord("");
      setNewMeaning("");
    } catch (error) {
      console.error("Error fetching meaning:", error);
    }
  };
  const handleDelete = (indexToDelete) => {
    const updatedWords = words.filter((_, index) => index !== indexToDelete);
    setWords(updatedWords);
  };

  return (
    <div
      style={{
        width: "100vw",
        fontFamily: "'Courier New', Courier, monospace",
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
      }}
    ><div
    style={{
      Width: "100%",
      padding: "2rem",
    }}>
      
      <h1 style={{ textAlign: "center", color: "#000"}}>evol</h1>
      <h3 style={{ textAlign: "center", color: "#000"}}>Words hold words, hold words from meaning</h3>
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
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          width: "100%",
        }}
      >
        {words.map((w, index) => (
  <WordCard
    key={index}
    {...w}
    onDelete={() => handleDelete(index)}
  />
))}
      </div>
    </div>
    </div>
  );
}

export default App;


