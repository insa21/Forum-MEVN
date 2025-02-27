import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";

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
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Connect to MongoDB
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// Define a simple route
app.get("/", (req, res) => {
  res.status(200).json({ message: "Message dari Express" });
});

// Parent Route
app.use("/api/v1/auth", authRouter);
app.use(notFound);
app.use(errorHandler);

// Start the server
app
  .listen(port, () => {
    console.log(`🚀 Server is running at http://localhost:${port}`);
  })
  .on("error", (err) => {
    console.error("❌ Server failed to start:", err);
  });
