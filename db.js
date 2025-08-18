const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // apna MySQL username
  password: "Sumer@2556", // apna MySQL password
  database: "auth_db",
});

db.connect((err) => {
  if (err) throw err;
  console.log("✅ MySQL Connected...");
});

module.exports = db;
