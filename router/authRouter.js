import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUser,
} from "../controllers/authController.js";
import {
  authMiddleware,
  permisionUser,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

// Post /api/v1/auth/*
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/getuser", authMiddleware, getUser);
router.get("/test", authMiddleware, permisionUser("admin"), (req, res) => {
  res.status(200).send("Berhasil");
});

export default router;
