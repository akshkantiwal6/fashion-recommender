import { useState } from "react";
import bg from "../assets/background.jpg";

function Upload() {
  const [gender, setGender] = useState("");
  const [occasion, setOccasion] = useState("");
  const [weather, setWeather] = useState("");
  const [have, setHave] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");

  const handleRecommend = () => {
    let imgName = "";

    if (have === "light_jeans") imgName = `${gender}_dark_shirt`;
    else if (have === "dark_jeans") imgName = `${gender}_light_shirt`;
    else if (have === "light_shirt") imgName = `${gender}_dark_jeans`;
    else if (have === "dark_shirt") imgName = `${gender}_light_jeans`;
    else imgName = `${gender}_${occasion}_${weather}`;

    setImage(`/assets/${imgName}.png`);
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      {/* 🏠 Home */}
      <button style={styles.homeBtn} onClick={() => window.location.href = "/"}>
        🏠
      </button>

      <div style={styles.cardWrapper}>
        
        {/* LEFT SIDE FORM */}
        <div style={styles.card}>
          <h2 style={styles.title}>Outfit Recommendation 😎</h2>

          <select onChange={(e) => setHave(e.target.value)} style={styles.input}>
            <option value="">Select What You Have</option>
            <option value="light_jeans">Light Jeans</option>
            <option value="dark_jeans">Dark Jeans</option>
            <option value="light_shirt">Light Shirt</option>
            <option value="dark_shirt">Dark Shirt</option>
          </select>

          <select onChange={(e) => setWeather(e.target.value)} style={styles.input}>
            <option value="">Select Weather</option>
            <option value="summer">Summer</option>
            <option value="winter">Winter</option>
            <option value="rainy">Rainy</option>
          </select>

          <select onChange={(e) => setOccasion(e.target.value)} style={styles.input}>
            <option value="">Select Occasion</option>
            <option value="casual">Casual</option>
            <option value="formal">Formal</option>
            <option value="party">Party</option>
            <option value="wedding">Wedding</option>
          </select>

          <select onChange={(e) => setGender(e.target.value)} style={styles.input}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input
            type="number"
            placeholder="Enter Age"
            style={styles.input}
            onChange={(e) => setAge(e.target.value)}
          />

          <button style={styles.btn} onClick={handleRecommend}>
            Recommend 🔥
          </button>
        </div>

        {/* RIGHT SIDE IMAGE */}
        {image && (
          <div style={styles.imageBox}>
            <img src={image} alt="outfit" style={styles.image} />
          </div>
        )}

      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.7)",
  },

  homeBtn: {
    position: "absolute",
    top: "20px",
    left: "20px",
    padding: "8px",
    borderRadius: "10px",
    background: "rgba(0,0,0,0.5)",
    color: "#fff",
    cursor: "pointer",
    zIndex: 10,
  },

  cardWrapper: {
    display: "flex",
    gap: "25px",
    alignItems: "center",
    zIndex: 2,
  },

  card: {
    width: "340px",
    padding: "25px",
    borderRadius: "14px",
    background: "rgba(20,40,60,0.9)",
    color: "#fff",
    textAlign: "center",
    boxShadow: "0 0 40px rgba(168,85,247,0.6)",
  },

  title: {
    marginBottom: "10px",
  },

  input: {
    width: "100%",
    margin: "8px 0",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    background: "#1e293b",
    color: "#fff",
    outline: "none",
    boxSizing: "border-box",
  },

  btn: {
    marginTop: "12px",
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    background: "linear-gradient(45deg, #a855f7, #6366f1)",
    color: "#fff",
    cursor: "pointer",
  },

  imageBox: {
    width: "300px",
    height: "400px",
    borderRadius: "12px",
    overflow: "hidden",
    border: "2px solid rgba(168,85,247,0.5)",
    boxShadow: "0 0 20px rgba(168,85,247,0.5)",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
};

export default Upload;