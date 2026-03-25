const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// DB Connection
mongoose.connect("mongodb://localhost:27017/codingGita")
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch(() => console.log("MongoDB Connection Failed"));

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

// Model
const User = mongoose.model("User", userSchema);

// Route (POST for register)
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const newUser = new User({
      name,
      email,
      password
    });

    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: newUser
    });

  } catch (error) {
    res.status(400).json({
      message: "Error occurred",
      error: error.message
    });
  }
});

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});   