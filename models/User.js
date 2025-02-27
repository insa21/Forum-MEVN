import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Username harus diinput"],
    unique: [true, "Username sudah ada"],
  },
  email: {
    type: String,
    required: [true, "Email harus diinput"],
    unique: [true, "Email sudah ada"],
    lowercase: true,
    validate: [validator.isEmail, "Email tidak valid"],
  },
  password: {
    type: String,
    required: [true, "Password harus diinput"],
    minlength: [6, "Password minimal 6 karakter"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.methods.comparePassword = async function (reqPassword) {
  return await bcrypt.compare(reqPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model("User", userSchema);
export default User;
