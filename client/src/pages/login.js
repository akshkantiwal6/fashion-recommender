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

export default function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });

  const [isSignup, setIsSignup] = useState(false);

  //  slideshow logic 
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

  const handleLogin = async () => {
  try {
    const url = isSignup
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/login";

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (isSignup) {
      alert("Account Created ✅");
      setIsSignup(false);
      return;
    }

    if (data.success) {
      localStorage.setItem("username", form.username);

      if (data.role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/upload";
      }
    } else {
      alert("Invalid Credentials ❌");
    }
  } catch {
    alert("Server Error ❌");
  }
};

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <div style={styles.wrapper}>
        
        {/*  LEFT SLIDESHOW */}
        <div style={styles.slideBox}>
          <img src={images[index]} alt="model" style={styles.slideImg} />
          <h3 style={styles.slideText}>Discover Your Style ✨</h3>
        </div>

        {/*  LOGIN CARD */}
        <div style={styles.card}>
          <h2 style={styles.title}>Fashion Recommender</h2>
          <p style={styles.subtitle}>Get your perfect outfit instantly 👕</p>
          <button
          style={styles.createBtn}
          onClick={() => setIsSignup(!isSignup)}
          >
           {isSignup ? "Back to Login" : "Create Account"}
          </button>

          {/* Role Toggle */}
          <div style={styles.toggle}>
            <button
              style={{
                ...styles.toggleBtn,
                background: form.role === "user" ? "#3b82f6" : "transparent",
              }}
              onClick={() => setForm({ ...form, role: "user" })}
            >
              User
            </button>
            <button
              style={{
                ...styles.toggleBtn,
                background: form.role === "admin" ? "#3b82f6" : "transparent",
              }}
              onClick={() => setForm({ ...form, role: "admin" })}
            >
              Admin
            </button>
          </div>

          <input
            type="text"
            placeholder={form.role === "admin" ? "Admin Name" : "Username"}
            style={styles.input}
            onChange={update("username")}
          />
          
          {isSignup && (
          <input
          type="email"
           placeholder="Email"
           style={styles.input}
           onChange={update("email")}
          />
          )}

          <div style={styles.passwordBox}>
        <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
         style={styles.input}
          onChange={update("password")}
          />

            <span style={styles.eye}
              onClick={() => setShowPassword(!showPassword)} >
              {showPassword ? "🔓" : "🔒"}
           </span>
         </div>

         <button style={styles.btn} onClick={handleLogin}>
           {isSignup ? "Signup" : "Login"}
         </button>
        </div>

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

  wrapper: {
    display: "flex",
    gap: "60px",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  slideBox: {
    width: "260px",
    textAlign: "center",
    transform: "translateX(-120px)",
    transform: "translate(-40px, 20px)",
  },

  createBtn: {
  marginTop: "10px",
  marginBottom: "10px",
  padding: "6px 12px",
  fontSize: "12px",
  borderRadius: "6px",
  border: "none",
  background: "rgba(99,102,241,0.8)",
  color: "#fff",
  cursor: "pointer",
  },

  slideImg: {
    width: "100%",
    height: "360px",
    objectFit: "cover",
    borderRadius: "12px",
    boxShadow: "0 0 20px rgba(168,85,247,0.5)",
    transition: "all 0.6s ease",
    transform: "scale(1.05)",   
    opacity: 0.95,       
    transform: "scale(1.08)",
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

  title: {
    marginBottom: "5px",
  },

  subtitle: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#ccc",
  },

  toggle: {
    display: "flex",
    marginBottom: "10px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  toggleBtn: {
    flex: 1,
    padding: "8px",
    color: "#fff",
    cursor: "pointer",
    border: "none",
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

  passwordBox: {
  position: "relative",
},

eye: {
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
  fontSize: "16px",
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
};