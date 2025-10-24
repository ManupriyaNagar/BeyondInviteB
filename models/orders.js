// models/Order.js
import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customer: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  payment: {
    cardName: String,
    cardNumber: String, // ideally save only last 4 digits
    expiryDate: String,
  },
  cartItems: [
    {
      id: String,
      title: String,
      image: String,
      price: Number, 
      quantity: Number,
    },
  ],
  subtotal: Number,
  tax: Number,
  total: Number,
  status: { type: String, default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
