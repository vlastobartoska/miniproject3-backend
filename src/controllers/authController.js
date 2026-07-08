const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Models = require("../model");

const register = async (req, res) => {
  try {
    const { name, emailId, password } = req.body;

    if (!name || !emailId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await Models.User.findOne({
      where: { emailId },
    });

    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const user = await Models.User.create({
      name,
      emailId,
      password,
    });

    const token = jwt.sign(
      { id: user.id, emailId: user.emailId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ message: "User registered", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const user = await Models.User.findOne({
      where: { emailId },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, emailId: user.emailId },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { register, login };