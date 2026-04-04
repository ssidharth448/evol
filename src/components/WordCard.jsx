function WordCard({ word, meaning, onDelete }) {
  return (
    <div
      style={{
        width: "200px",
        padding: "1rem",
        paddingBottom: "2rem",
        margin: "1rem",
        backgroundColor: "#fff",
        border: "1px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0 10px 15px rgba(0,0,0,0.15)",
        transform: `rotate(${Math.floor(Math.random() * 6 - 3)}deg)`,
        textAlign: "center",
        fontFamily: "'Courier New', Courier, monospace",
        position: "relative",
        color: "#000",
      }}
    >
      {/* DELETE BUTTON */}
      <button
  onClick={onDelete}
  style={{
    position: "absolute",
    top: "6px",
    right: "8px",
    background: "transparent",   
    border: "none",
    color: "#333",              
    fontSize: "18px",            
    fontWeight: "bold",
    cursor: "pointer",
    lineHeight: "1",
  }}
>
  ×
</button>

      <h2 style={{ margin: "0 0 0.5rem 0" }}>{word}</h2>
      <p style={{ margin: 0 }}>{meaning}</p>

      {/* Bottom Polaroid strip */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "15px",
          backgroundColor: "#fff",
          borderTop: "1px solid #ddd",
        }}
      ></div>
    </div>
  );
}

export default WordCard;