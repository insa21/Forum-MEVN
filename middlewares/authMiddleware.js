import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies.jwt;

  // Perbaikan: Jika token tidak ada, kirim respons error
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Anda tidak boleh mengakses halaman ini",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Token yang dimasukkan salah atau tidak ada",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};

export const permisionUser = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        status: "fail",
        message: "Anda tidak memiliki akses untuk halaman ini",
      });
    }
    next();
  };
};
