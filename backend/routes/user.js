const express = require("express");
const zod = require("zod");
const mongoose = require("mongoose");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { authMiddleware } = require("../middleware");

const router = express.Router();

// USER SIGN UP

const signupBody = zod.object({
  username: zod.string().email("Invalid email format"),
  firstName: zod.string().min(1, "First name is required"),
  lastName: zod.string().min(1, "Last name is required"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  transactionPin: zod.string().length(6, "PIN must be exactly 6 digits"),
});

router.post("/signup", async (req, res) => {
  try {
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(411).json({
        message: `Incorrect inputs: ${errors}`,
      });
    }

    const existingUser = await User.findOne({
      username: req.body.username.toLowerCase(),
    });

    if (existingUser) {
      return res.status(411).json({
        message: "Email already taken",
      });
    }

    const { username, firstName, lastName, password, transactionPin } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Hash the PIN as well
    const hashedPin = await bcrypt.hash(transactionPin, salt);
    
    // Create user
    const newUser = await User.create({
      username: username.toLowerCase().trim(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      password: hashedPassword,
      transactionPin: hashedPin,
    });
    
    const userId = newUser._id;

    // ----- Create new account ------
    await Account.create({
      userId,
      balance: Math.floor(Math.random() * 10000),
    });

    // ----- Generate JWT Token -----
    const token = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      message: "User created successfully",
      token: token,
    });
  } catch (error) {
    console.error("Signup error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: error.message || "Internal server error during signup",
    });
  }
});

// USER SIGN IN

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const result = signinBody.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`).join(', ');
      return res.status(411).json({
        message: `Incorrect inputs: ${errors}`,
      });
    }

    const user = await User.findOne({
      username: req.body.username.toLowerCase(),
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res.status(401).json({
        message: "Wrong credentials!",
      });
    }

    const token = jwt.sign(
      {
        userId: user._id,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      token: token,
    });
  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({
      message: error.message || "Internal server error during signin",
    });
  }
});

// FOR UPDATING USER INFO

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success } = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Error while updating information",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);

  res.json({
    message: "Updated successfully",
  });
});

// FOR GETTING USERS WITH FILTER QUERY

router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
      isMalicious: user.isMalicious,
    })),
  });
});

// FOR GETTING CURRENT USER INFO

router.get("/getUser", authMiddleware, async (req, res) => {
  const user = await User.findOne({
    _id: req.userId,
  });
  res.json(user);
});

module.exports = router;
