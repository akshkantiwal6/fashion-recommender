const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/fashionDB")
  .then(() => console.log("MongoDB Connected 😎"))
  .catch(err => console.log(err));

// 👤 User Schema
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);


// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    await user.save();
    res.json("User Registered 😎");
  } catch (err) {
    res.json("Error");
  }
});


// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { username, password, role } = req.body;

  // 🔥 ADMIN LOGIN (fixed)
  if (role === "admin") {
    if (username === "akio" && password === "23august") {
      return res.json({ success: true, role: "admin" });
    } else {
      return res.json({ success: false });
    }
  }

  // 👤 USER LOGIN
  const user = await User.findOne({ username, password });

  if (user) {
    res.json({ success: true, role: "user" });
  } else {
    res.json({ success: false });
  }
});

// ================= GET ALL USERS =================
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json([]);
  }
});


// ================= RUN =================
app.listen(5000, () => {
  console.log("Server running on port 5000 🚀");
});