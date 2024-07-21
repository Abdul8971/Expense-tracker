const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: { type: Date, required: [true, "date is required"] },
  amount: { type: Number, required: [true, "amount is required"], trim: true },
  category: { type: String, required: true, trim: true },
  description: { type: String, trim: true },
});

module.exports = mongoose.model("Expense", ExpenseSchema);
