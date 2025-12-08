const User = require("../models/User");
const bcrypt = require("bcrypt");

// ====================== SIGNUP ======================
exports.signup = async (req, res) => {
  try {
    console.log("Signup request body:", req.body);
    const { username, email, password } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "Signup successful!",
      user,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || "Signup failed",
    });
  }
};


// ====================== LOGIN ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    res.json({
      success: true,
      message: "Login successful",
      user,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed" });
  }
};
