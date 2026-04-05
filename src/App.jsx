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
  const [options, setOptions] = useState([]);
  const [pendingWord, setPendingWord] = useState("");

  // Save words to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("words", JSON.stringify(words));
  }, [words]);

  const handleAddWord = async (e) => {
    e.preventDefault();
    if (!newWord) return;
  
    // If manual meaning exists → skip API
    if (newMeaning.trim()) {
      setWords([...words, { word: newWord, meaning: newMeaning }]);
      setNewWord("");
      setNewMeaning("");
      return;
    }
  
    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
      );
      const data = await res.json();
  
      // Extract 5 meanings
      const meanings = 
      data[0]?.meanings?.slice(0, 5).flatMap((m) =>
        m.definitions.map((d) => d.definition)
      ) || [];
  
      if (meanings.length === 0) {
        alert("No meanings found. Enter manually.");
        return;
      }
  
      // Store options instead of directly adding
      setOptions(meanings);
      setPendingWord(newWord);
  
    } catch (error) {
      console.error("Error fetching meaning:", error);
    }
  };
  const handleSelectMeaning = (meaning) => {
    setWords([...words, { word: pendingWord, meaning }]);
    setOptions([]);
    setPendingWord("");
    setNewWord("");
  };
  const handleDelete = (indexToDelete) => {
    const updatedWords = words.filter((_, index) => index !== indexToDelete);
    setWords(updatedWords);
  };

  return (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        position: "relative",
        fontFamily: "'Courier New', Courier, monospace",
        backgroundColor: "#f2f2f2",
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
  {newMeaning.trim() === "" ? "Search" : "Add"}
</button>
      </form>
      {options.length > 0 && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.5)", // dark overlay
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    }}
  >
    <div
      style={{
        background: "#fff",
        fontFamily: "'Courier New', Courier, monospace",
        position: "relative",
        color: "#000",
        padding: "2rem",
        borderRadius: "10px",
        width: "400px",
        maxHeight: "70vh",
        overflowY: "auto",
        textAlign: "center",
      }}
    >
      <h3 style={{ marginBottom: "1rem" }}>Choose a meaning</h3>

      {options.slice(0, 5).map((opt, i) => (
        <div
          key={i}
          onClick={() => handleSelectMeaning(opt)}
          style={{
            padding: "0.5rem",
            margin: "0.5rem 0",
            background: "#f2f2f2",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          {opt}
        </div>
      ))}

      {/* Cancel button */}
      <button
        onClick={() => setOptions([])}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          cursor: "pointer",
        }}
      >
        Cancel
      </button>
    </div>
  </div>
)}
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


