import { useEffect, useState } from "react";
import bg from "../assets/background.jpg";

function Admin() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  // 🔥 fetch users
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  // 🔍 filter users
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(search.toLowerCase()) ||
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.overlay}></div>

      {/* 🏠 Home Button */}
      <button style={styles.homeBtn} onClick={() => window.location.href = "/"}>
        🏠
      </button>

      <div style={styles.container}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        {/* 🔍 Search */}
        <input
          type="text"
          placeholder="Search users..."
          style={styles.search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* 👤 User List */}
        <div style={styles.list}>
          {filteredUsers.map((user, index) => (
            <div key={index} style={styles.card}>
              <p><b>Username:</b> {user.username}</p>
              <p><b>Email:</b> {user.email}</p>
            </div>
          ))}
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
    backgroundPosition: "center",
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
    maxHeight: "400px",
    overflowY: "auto",
  },

  card: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "8px",
    background: "rgba(168,85,247,0.2)",
    border: "1px solid rgba(168,85,247,0.3)",
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

export default Admin;