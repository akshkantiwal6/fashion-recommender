const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fashionDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(console.log);

// ================= USER =================
const User = mongoose.model("User", {
  username: String,
  email: String,
  password: String,
});

// ================= HISTORY =================
const History = mongoose.model("History", {
  username: String,
  gender: String,
  occasion: String,
  weather: String,
  have: String,
  age: String,
  result: String,
  createdAt: { type: Date, default: Date.now },
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  try {
    await User.create(req.body);
    res.json("User Registered 😎");
  } catch {
    res.json("Error");
  }
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  if (role === "admin")
    return res.json(
      username === "akio" && password === "23august"
        ? { success: true, role: "admin" }
        : { success: false }
    );

  const user = await User.findOne({ username, password });
  res.json(user ? { success: true, role: "user" } : { success: false });
});

// ================= GET USERS =================
app.get("/users", async (_, res) => {
  try {
    res.json(await User.find());
  } catch {
    res.json([]);
  }
});

// ================= SAVE HISTORY =================
app.post("/save-history", async (req, res) => {
  try {
    await History.create(req.body);
    res.json({ success: true });
  } catch {
    res.json({ success: false });
  }
});

// ================= GET HISTORY =================
app.get("/history", async (_, res) => {
  try {
    const data = await History.find().sort({ createdAt: -1 });
    res.json(data);
  } catch {
    res.json([]);
  }
});

// ================= RUN =================
app.listen(5000, () => console.log("Server running on port 5000"));