const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING

const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ msg: "Email exists" });

    const hashed = await bcrypt.hash(password, 10);

    const user = new Student({
      name,
      email,
      password: hashed,
      course
    });

    await user.save();

    res.json({ msg: "Registered successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await Student.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ msg: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.json({ token });
});

// UPDATE PASSWORD
router.put("/update-password", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await Student.findById(req.user.id);

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return res.status(400).json({ msg: "Wrong password" });

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.json({ msg: "Password updated" });
});

// UPDATE COURSE
router.put("/update-course", auth, async (req, res) => {
  const { course } = req.body;

  await Student.findByIdAndUpdate(req.user.id, { course });

  res.json({ msg: "Course updated" });
});

module.exports = router; // ✅ IMPORTANT