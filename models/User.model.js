const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type:String,
    default:"anonym"
  },
  email: {
    type: String,
    required: true,
    uniqued: true,
  },
  password: {
    type: String || Number,
    required: true,
  },
});

const User = mongoose.model("User", userSchema)

module.exports = User