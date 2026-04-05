import { useState, useEffect } from "react";
import WordCard from "./components/WordCard";
import { SignedIn, SignedOut, UserButton, SignOutButton, useUser, useAuth } from "@clerk/clerk-react";
import { supabase } from "./supabaseClient";
import { Navigate } from "react-router-dom";

function App() {
  const { isLoaded } = useAuth();
  const { user } = useUser();
  const [words, setWords] = useState([]);
  const [newWord, setNewWord] = useState("");
  const [newMeaning, setNewMeaning] = useState("");
  const [options, setOptions] = useState([]);
  const [pendingWord, setPendingWord] = useState("");

  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!user) return;
    const fetchWords = async () => {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: true });
      if (!error) setWords(data);
    };
    fetchWords();
  }, [user]);

  if (!isLoaded) return null;

  const handleAddWord = async (e) => {
    e.preventDefault();
    if (!newWord) return;

    if (newMeaning.trim()) {
      const { data, error } = await supabase
        .from("words")
        .insert([{ user_id: user.id, word: newWord, meaning: newMeaning }])
        .select();
      if (!error) setWords([...words, ...data]);
      setNewWord("");
      setNewMeaning("");
      return;
    }

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${newWord}`
      );
      const data = await res.json();
      const meanings =
        data[0]?.meanings?.slice(0, 5).flatMap((m) =>
          m.definitions.map((d) => d.definition)
        ) || [];
      if (meanings.length === 0) {
        alert("No meanings found. Enter manually.");
        return;
      }
      setOptions(meanings);
      setPendingWord(newWord);
    } catch (error) {
      console.error("Error fetching meaning:", error);
    }
  };

  const handleSelectMeaning = async (meaning) => {
    const { data, error } = await supabase
      .from("words")
      .insert([{ user_id: user.id, word: pendingWord, meaning }])
      .select();
    if (!error) setWords([...words, ...data]);
    setOptions([]);
    setPendingWord("");
    setNewWord("");
  };

  const handleDelete = async (id) => {
    await supabase.from("words").delete().eq("id", id);
    setWords(words.filter((w) => w.id !== id));
  };

  return (
    <>
      <SignedOut>
        <Navigate to="/sign-in" replace />
      </SignedOut>

      <SignedIn>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            position: "relative",
            fontFamily: "'Courier New', Courier, monospace",
            background: "linear-gradient(135deg, rgb(255, 253, 246), rgb(231, 231, 231))",
          }}
        >
          <div style={{ position: "absolute", top: 20, right: 20, display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <UserButton />
            <SignOutButton redirectUrl="/sign-in">
              <button style={{ padding: "0.3rem 0.75rem", cursor: "pointer" }}>Logout</button>
            </SignOutButton>
          </div>

          <div style={{ width: "100%", padding: "2rem", boxSizing: "border-box" }}>
            <h1 style={{ textAlign: "center", color: "#000" }}>evol</h1>
            <h3 style={{ textAlign: "center", color: "#000" }}>
              Words hold words, hold words from meaning
            </h3>
            <p style={{ textAlign: "center" }}>Collect words you love</p>

            {/* Form */}
            <form
              onSubmit={handleAddWord}
              style={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
                margin: "2rem 0",
              }}
            >
              <input
                type="text"
                placeholder="Word"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                style={{
                  padding: "0.5rem",
                  width: isMobile ? "100%" : "auto",
                  boxSizing: "border-box",
                }}
              />
              <input
                type="text"
                placeholder="Meaning"
                value={newMeaning}
                onChange={(e) => setNewMeaning(e.target.value)}
                style={{
                  padding: "0.5rem",
                  width: isMobile ? "100%" : "auto",
                  boxSizing: "border-box",
                }}
              />
              <button
  type="submit"
  style={{
    padding: "0.5rem 1rem",
    width: isMobile ? "100%" : "auto",
    backgroundColor: "#1a1a1a",
    color: "#fff",
    boxSizing: "border-box",
  }}
>
                {newMeaning.trim() === "" ? "Search" : "Add"}
              </button>
            </form>

            {/* Modal */}
            {options.length > 0 && (
              <div
                style={{
                  position: "fixed", top: 0, left: 0,
                  width: "100%", height: "100%",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  display: "flex", justifyContent: "center", alignItems: "center",
                  zIndex: 1000,
                }}
              >
                <div
                  style={{
                    background: "#fff", color: "#000", padding: "2rem",
                    borderRadius: "10px",
                    width: isMobile ? "90%" : "400px",
                    maxHeight: "70vh", overflowY: "auto", textAlign: "center",
                  }}
                >
                  <h3>Choose a meaning</h3>
                  {options.slice(0, 5).map((opt, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelectMeaning(opt)}
                      style={{
                        padding: "0.5rem", margin: "0.5rem 0",
                        background: "#f2f2f2", cursor: "pointer", borderRadius: "6px",
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                  <button
                    onClick={() => setOptions([])}
                    style={{ marginTop: "1rem", padding: "0.5rem 1rem", cursor: "pointer" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {/* Cards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(auto-fill, minmax(220px, 1fr))",
                gap: "20px",
                width: "100%",
              }}
            >
              {words.map((w) => (
                <WordCard
                  key={w.id}
                  {...w}
                  onDelete={() => handleDelete(w.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </SignedIn>
    </>
  );
}

export default App;