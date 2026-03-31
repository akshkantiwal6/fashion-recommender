import { useState, useEffect } from "react";
import bg from "../assets/background.jpg";

// slideshow imports 
import m1 from "../assets/model1.png";
import m2 from "../assets/model2.png";
import m3 from "../assets/model3.png";
import m4 from "../assets/model4.png";
import m5 from "../assets/model5.png";
import m6 from "../assets/model6.png";
import m7 from "../assets/model7.png";
import m8 from "../assets/model8.png";
import m9 from "../assets/model9.png";
import m10 from "../assets/model10.png";

export default function Upload() {
  const [form, setForm] = useState({
    gender: "",
    occasion: "",
    weather: "",
    have: "",
    age: "",
  });

  const [image, setImage] = useState("");

  //slideshow
  const images = [m1, m2, m3, m4, m5, m6, m7, m8, m9, m10];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const update = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const handleRecommend = async () => {
    const { gender, occasion, weather, have, age } = form;

    const map = {
      light_jeans: `${gender}_dark_shirt`,
      dark_jeans: `${gender}_light_shirt`,
      light_shirt: `${gender}_dark_jeans`,
      dark_shirt: `${gender}_light_jeans`,
    };

    const imgName = map[have] || `${gender}_${occasion}_${weather}`;

    setImage(`/assets/${imgName}.png`);

    // SAVE HISTORY
    try {
      await fetch("http://localhost:5000/save-history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: localStorage.getItem("username") || "guest",
          gender,
          occasion,
          weather,
          have,
          age,
          result: imgName,
        }),
      });
    } catch {
      console.log("History save error");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <button style={styles.homeBtn} onClick={() => (window.location.href = "/")}>
        🏠
      </button>

      <div style={styles.cardWrapper}>

        {/* SLIDESHOW */}
        <div style={styles.slideBox}>
          <img src={images[index]} alt="model" style={styles.slideImg} />
          <h3 style={styles.slideText}>Trending Styles 🔥</h3>
        </div>

        {/* FORM */}
        <div style={styles.card}>
          <h2 style={styles.title}>Outfit Recommendation 😎</h2>

          {[
            ["have", "Select What You Have", [
              ["light_jeans", "Light Jeans"],
              ["dark_jeans", "Dark Jeans"],
              ["light_shirt", "Light Shirt"],
              ["dark_shirt", "Dark Shirt"],
            ]],
            ["weather", "Select Weather", [
              ["summer", "Summer"],
              ["winter", "Winter"],
              ["rainy", "Rainy"],
            ]],
            ["occasion", "Select Occasion", [
              ["casual", "Casual"],
              ["formal", "Formal"],
              ["party", "Party"],
              ["wedding", "Wedding"],
            ]],
            ["gender", "Select Gender", [
              ["male", "Male"],
              ["female", "Female"],
            ]],
          ].map(([key, placeholder, options]) => (
            <select key={key} onChange={update(key)} style={styles.input}>
              <option value="">{placeholder}</option>
              {options.map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          ))}

          <input
            type="number"
            placeholder="Enter Age"
            style={styles.input}
            onChange={update("age")}
          />

          <button style={styles.btn} onClick={handleRecommend}>
            Recommend 🔥
          </button>
        </div>

        {image && (
      <div style={styles.imageBox}>
      <img src={image} alt="outfit" style={styles.image} />
  
      <p style={styles.imageText}>Styled Just For You 💫</p>
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
    gap: "60px",
    alignItems: "center",
    zIndex: 2,
  },

  slideBox: {
    width: "260px",
    textAlign: "center",
    transform: "translate(-40px, 25px)",
  },

  slideImg: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(168,85,247,0.5)",
  },

  slideText: {
    marginTop: "10px",
    color: "#fff",
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

  title: { marginBottom: "10px" },

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
  borderRadius: "12px",
  border: "2px solid rgba(168,85,247,0.5)",
  boxShadow: "0 0 20px rgba(168,85,247,0.5)",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
},

  image: {
  width: "100%",
  height: "400px",
  objectFit: "cover",
},

  imageText: {
  marginTop: "8px",
  textAlign: "center",
  color: "#fff",
  fontSize: "14px",
  opacity: 0.85,
},
};