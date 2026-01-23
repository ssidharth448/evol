function WordCard({ word, meaning }) {
    return (
      <div
        style={{
          width: "200px",
          padding: "1rem",
          paddingBottom: "2rem", // space for “polaroid border”
          margin: "1rem",
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 10px 15px rgba(0,0,0,0.15)",
          transform: `rotate(${Math.floor(Math.random() * 6 - 3)}deg)`, // random tilt
          textAlign: "center",
          fontFamily: "'Courier New', Courier, monospace", // retro vibe
          position: "relative",
          color: "#000",
        }}
      >
        <h2 style={{ margin: "0 0 0.5rem 0" }}>{word}</h2>
        <p style={{ margin: 0 }}>{meaning}</p>
  
        {/* Bottom “border” to mimic Polaroid */}
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
  