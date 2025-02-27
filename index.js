import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", // Sesuaikan dengan URL frontend
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Define a simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Message dari Express" });
});

// Start the server
app
  .listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });
