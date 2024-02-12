const mongoose = require("mongoose");

// Kullanıcı şemasını tanımla
const userShema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "author"],
      default: "user",
    },
    reset: {
      code: {
        type: String,
        default: null,
      },
      time: {
        type: Date,
        default: null,
      },
    },
  },
  { collation: "users", timestamps: true }
);

// Kullanıcı modelini oluştur
const userModel = mongoose.model("users", userShema);

module.exports = userModel;
