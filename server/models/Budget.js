const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  category: { type: String, required: true, trim: true },
  amount: { type: Number, required: [true, "amount is required"], trim: true },
});

module.exports = mongoose.model("Budget", BudgetSchema);
