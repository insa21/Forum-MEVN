import User from "../models/User.js";
import jwt from "jsonwebtoken";
import asyncHandler from "../middlewares/asyncHandler.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "6d",
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user.id);

  const cookieOptions = {
    expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: process.env.NODE_ENV === "production",
    secure: false,
  };

  res.cookie("jwt", token, cookieOptions);
  user.password = undefined;

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const registerUser = asyncHandler(async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;

  const role = isFirstAccount ? "admin" : "user";

  const createUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    role,
  });

  createSendToken(createUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
  // Validasi jika Email dan Password tidak di isi
  if (!req.body.email && !req.body.password) {
    return res.status(400).json({
      status: "fail",
      message: "Mohon isi email dan password",
    });
  }

  // Check jika email yang di input sudah terdaftar di DB
  const userData = await User.findOne({ email: req.body.email });

  if (userData && (await userData.comparePassword(req.body.password))) {
    createSendToken(userData, 200, res);
  } else {
    res.status(400).json({
      status: "fail",
      message: "Invalid email or password",
    });
  }
});

export const logoutUser = (req, res) => {
  res.send("logout user");
};

export const getUser = (req, res) => {
  res.send("get user");
};
