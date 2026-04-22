const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());

// ✅ DEBUG: check env
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ routes (safe require)
try {
  const authRoutes = require("./routes/authRoutes"); // 👈 path check
  app.use("/api", authRoutes);
  console.log("Routes loaded");
} catch (err) {
  console.log("ROUTE ERROR:", err.message);
}

// ✅ DB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log("DB Error:", err.message));

// ✅ server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});