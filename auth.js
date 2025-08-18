const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../db");

const router = express.Router();

// Register
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).send("All fields required!");

  const hashedPassword = await bcrypt.hash(password, 10);
  db.query(
    "INSERT INTO users (username, password) VALUES (?, ?)",
    [username, hashedPassword],
    (err) => {
      if (err) return res.status(500).send("DB Error");
      res.send("✅ User registered successfully!");
    }
  );
});

// Login
router.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.query(
    "SELECT * FROM users WHERE username = ?",
    [username],
    async (err, results) => {
      if (err) return res.status(500).send("DB Error");
      if (results.length === 0) return res.status(400).send("User not found!");

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).send("Invalid credentials!");

      req.session.user = user;
      res.send("✅ Login successful!");
    }
  );
});

// Logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).send("Error logging out");
    res.send("✅ Logged out successfully!");
  });
});

module.exports = router;
