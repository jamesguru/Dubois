const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    location: { type: String },
    address: { type: String },
    seller: { type: String },
    ratings: [
      {
        star: Number,

        name: { type: String },

        comment: { type: String },

        postedBy: { type: String },
      }],
    customers: [
      {
        name: { type: String },

        email: { type: String },

        phone: { type: Number },
      },
    ],
    active: { type: Boolean, default: true },
    isAdmin: {
      type: Boolean,
      default: false,
    },

    img: { type: String },
  },

  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
