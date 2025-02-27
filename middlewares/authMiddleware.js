import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  let token = req.cookies.jwt;

  // Perbaikan: Cek apakah token tidak ada
  if (!token) {
    return res.status(401).json({
      status: "fail",
      message: "Anda tidak boleh mengakses halaman ini",
    });
  }

  try {
    // Perbaikan: Verifikasi token dengan benar
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        status: "fail",
        message: "User tidak ditemukan atau sudah dihapus",
      });
    }

    req.user = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      status: "fail",
      message: "Token tidak valid atau sudah kedaluwarsa",
    });
  }
};
