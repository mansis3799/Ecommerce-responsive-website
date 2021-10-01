var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var contactSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true
    },
    message: {
      type: String,
      required: true,
      maxlength: 50,
      trim: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);