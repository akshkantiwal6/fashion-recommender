import { useState } from "react";
import bg from "../assets/background.jpg";

function Login() {
  const [role, setRole] = useState("user");
  const [showPass, setShowPass] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  // 🧠 NEW STATES
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🚀 HANDLE SUBMIT
  const handleSubmit = async () => {
    const url = isSignup
      ? "http://localhost:5000/signup"
      : "http://localhost:5000/login";

    const body = isSignup
      ? { username, email, password }
      : { username, password, role };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (data.success || data === "User Registered 😎") {
        alert("Success 😎");

        // 🔥 REDIRECT
        if (!isSignup) {
          if (data.role === "admin") {
            window.location.href = "/admin";
          } else {
            window.location.href = "/upload";
          }
        }
      } else {
        alert("Invalid Credentials ❌");
      }
    } catch (err) {
      alert("Server Error ❌");
      console.log(err);
    }
  };

  return (
    <div style={styles.page}>
      <button style={styles.homeBtn} onClick={() => window.location.href = "/"}>
  🏠
   </button>
      <div style={styles.overlay}></div>

      <div style={styles.card}>
        <h2 style={styles.title}>Fashion Recommender</h2>

        <p style={styles.tagline}>
          Get your perfect outfit instantly 👕
        </p>

        <button
          style={styles.createBtn}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Back to Login" : "Create Account"}
        </button>

        {!isSignup && (
          <div style={styles.roleSwitch}>
            <button
              onClick={() => setRole("user")}
              style={{
                ...styles.roleBtn,
                ...(role === "user" ? styles.active : {}),
              }}
            >
              User
            </button>
            <button
              onClick={() => setRole("admin")}
              style={{
                ...styles.roleBtn,
                ...(role === "admin" ? styles.active : {}),
              }}
            >
              Admin
            </button>
          </div>
        )}

        <div style={styles.form}>
          {isSignup && (
            <input
              placeholder="Email"
              style={styles.input}
              onChange={(e) => setEmail(e.target.value)}
            />
          )}

          <input
            placeholder={role === "admin" ? "Admin Name" : "Username"}
            style={styles.input}
            onChange={(e) => setUsername(e.target.value)}
          />

          <div style={styles.passWrapper}>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Password"
              style={styles.input}
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              style={styles.eye}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.11 1 12c.73-1.64 1.8-3.13 3.06-4.36" />
                  <path d="M9.88 9.88A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  viewBox="0 0 24 24"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </span>
          </div>

          <button style={styles.btn} onClick={handleSubmit}>
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: `url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  
  homeBtn: {
  position: "absolute",
  top: "20px",
  left: "20px",
  padding: "6px 10px",
  borderRadius: "8px",
  border: "1px solid rgba(255,255,255,0.2)",
  background: "rgba(0,0,0,0.4)",
  color: "#fff",
  cursor: "pointer",
  zIndex: 10,
  },

  overlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.6)",
  },

  card: {
    position: "relative",
    width: "320px",
    padding: "28px",
    borderRadius: "14px",
    background: "rgba(20,40,60,0.85)",
    textAlign: "center",
    color: "#fff",
    zIndex: 2,
    boxShadow:
      "0 0 40px rgba(37,99,235,0.4), 0 20px 60px rgba(0,0,0,0.6)",
  },

  title: { marginBottom: "5px" },

  tagline: {
    fontSize: "12px",
    color: "#cbd5e1",
    marginBottom: "12px",
  },

  createBtn: {
    fontSize: "12px",
    padding: "5px 12px",
    borderRadius: "20px",
    border: "none",
    background: "#3b82f6",
    color: "#fff",
    marginBottom: "15px",
    cursor: "pointer",
  },

  roleSwitch: {
    display: "flex",
    marginBottom: "15px",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  roleBtn: {
    flex: 1,
    padding: "8px",
    border: "none",
    background: "transparent",
    color: "#ccc",
    cursor: "pointer",
  },

  active: {
    background: "#2563eb",
    color: "#fff",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },

  input: {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    background: "rgba(69, 112, 253, 0.15)",
    color: "#fff",
    boxSizing: "border-box",
  },

  passWrapper: {
  position: "relative",
  width: "100%",
  margin: "8px 0", // 🔥 match spacing
},

  eye: {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  cursor: "pointer",
},

  btn: {
    marginTop: "10px",
    padding: "8px 18px",
    borderRadius: "8px",
    border: "none",
    background: "#2563eb",
    color: "#fff",
    cursor: "pointer",
  },
};

export default Login;