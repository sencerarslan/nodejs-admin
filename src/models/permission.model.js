const mongoose = require("mongoose");

const permissionShema = new mongoose.Schema({
  permission: {
    type: String,
    enum: ["read", "write", "delete"],
    default: [],
  },
  role: {
    type: String,
    enum: ["user", "admin", "author"],
    unique: true,
  },
});

const permissionModel = mongoose.model("permissions", permissionShema);

module.exports = permissionModel;
