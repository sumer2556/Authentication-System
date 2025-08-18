const express = require("express");
const session = require("express-session");

const app = express();

// ✅ Middleware
app.use(express.json()); // JSON parse karega
app.use(express.urlencoded({ extended: true })); // form-data parse karega

app.use(
  session({
    secret: "mysecretkey",
    resave: false,
    saveUninitialized: true,
  })
);

// Routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
