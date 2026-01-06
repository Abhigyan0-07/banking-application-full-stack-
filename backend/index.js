const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const mainRouter = require("./routes/index");
const cors = require("cors");

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/user/changePassword.....

// /api/v1/account/transferMoney
// /api/v1/account/balance

//database
const connectDB = async () => {
  try {
    const mongoUrl = process.env.MONGO_URL;
    if (!mongoUrl) {
      throw new Error("MONGO_URL is not defined in environment variables");
    }
    console.log("Attempting to connect to MongoDB...");
    
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 5000, // 5 seconds - fail fast
      socketTimeoutMS: 45000,
      connectTimeoutMS: 10000,
    });
    
    console.log("✓ Database is connected successfully!");
    console.log("Connected to database:", mongoose.connection.name);
    return true;
  } catch (err) {
    console.error("✗ Database connection failed!");
    console.error("Error:", err.message);
    if (err.name === 'MongoServerSelectionError') {
      console.error("\nTroubleshooting steps:");
      console.error("1. Check your internet connection");
      console.error("2. Verify MongoDB Atlas IP whitelist (add 0.0.0.0/0 for testing)");
      console.error("3. Verify the connection string in .env file");
      console.error("4. Check if MongoDB Atlas cluster is running");
    }
    return false;
  }
};

app.get("/", (req, res) => {
  res.json("Server is up and running");
});

// Start server and attempt database connection
app.listen(process.env.PORT, async () => {
  console.log("Server is running on port: " + process.env.PORT);
  console.log("Connecting to database...");
  await connectDB();
});
