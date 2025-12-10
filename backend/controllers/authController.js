const User = require("../models/User");
const bcrypt = require("bcryptjs"); // FIXED: use bcryptjs
const jwt = require("jsonwebtoken");

// ====================== SIGNUP ======================
exports.signup = async (req, res) => {
  try {
    console.log("Signup request body:", req.body);

    const { name, email, password } = req.body;  // FIXED: frontend sends name, not username

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already registered",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username: name,   // FIXED: save name as username
      email,
      password: hashedPassword,
    });

    // Create JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Hide password in response
    const safeUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    res.status(201).json({
      success: true,
      message: "Signup successful!",
      user: safeUser,
      token,
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

    if (!email || !password)
      return res.status(400).json({ success: false, message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ success: false, message: "Invalid email or password" });

    // Generate token
    const token = jwt.sign(
      { id: user._id }, // FIXED
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      id: user._id,
      username: user.username,
      email: user.email
    };

    res.json({
      success: true,
      message: "Login successful",
      user: safeUser,
      token,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: err.message
    });
  }
};
