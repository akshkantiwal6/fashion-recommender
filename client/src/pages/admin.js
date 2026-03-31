import { useEffect, useState } from "react";
import bg from "../assets/background.jpg";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(setUsers);

    fetch("http://localhost:5000/history")
      .then(res => res.json())
      .then(setHistory);
  }, []);

  //  group history by user
  const groupedUsers = users.map(user => {
    const userHistory = history.filter(
      h => h.username === user.username
    );
    return { ...user, history: userHistory };
  });

  //  search filter
  const filteredUsers = groupedUsers.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      <button style={styles.homeBtn} onClick={() => window.location.href = "/"}>
        🏠
      </button>

      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        <input
          type="text"
          placeholder="Search users..."
          style={styles.search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div style={styles.list}>
          {filteredUsers.map((user, i) => (
            <div key={i} style={styles.card}>

              {/* USER INFO */}
              <p><b>Username:</b> {user.username}</p>
              <p><b>Email:</b> {user.email}</p>

              {/* USER HISTORY */}
              {user.history.length > 0 && (
                <div style={{ marginTop: "10px" }}>
                  <b>Activity:</b>

                  {user.history.map((h, j) => (
                    <div key={j} style={styles.innerCard}>
                      <p><b>Outfit:</b> {h.result}</p>
                      <p><b>Occasion:</b> {h.occasion}</p>
                      <p><b>Weather:</b> {h.weather}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
  minHeight: "100vh",
  width: "100%",
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  paddingTop: "40px",
  paddingBottom: "40px",
},

  container: {
    position: "relative",
    width: "80%",
    maxWidth: "800px",
    padding: "20px",
    borderRadius: "12px",
    background: "rgba(20,40,60,0.85)",
    color: "#fff",
    zIndex: 2,
    boxShadow: "0 0 30px rgba(168,85,247,0.5)",
  },

  title: {
    textAlign: "center",
    marginBottom: "15px",
  },

  search: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    marginBottom: "15px",
    background: "rgba(255,255,255,0.1)",
    color: "#fff",
    boxSizing: "border-box",
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  card: {
    padding: "12px",
    borderRadius: "8px",
    background: "rgba(168,85,247,0.2)",
    border: "1px solid rgba(168,85,247,0.3)",
  },

  innerCard: {
    marginTop: "8px",
    padding: "8px",
    borderRadius: "6px",
    background: "rgba(0,0,0,0.2)",
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
};