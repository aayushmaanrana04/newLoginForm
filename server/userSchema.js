const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  fname: {
    type: String,
    // required: true
  },
  lname: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[^@]+@\w+(\.\w+)+\w$/.test(v);
      },
      message: `not a valid email address!`,
    },
  },
  password: {
    type: String,
    minLength: 8,
    // required: true
  },
  cpassword: {
    type: String,
    // required: true
  },
  login: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("user", UserSchema);
