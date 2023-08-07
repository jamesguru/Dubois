const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    userId: { type: String, required: true },

    products: { type: Array, required: true },

    total: { type: Number, required: true },

    address: { type: String, required: true },

    phone: { type: Number, required: true },

    email: { type: String },
    selleremail: { type: String },

    status: { type: Number, default: 0 },
  },

  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
