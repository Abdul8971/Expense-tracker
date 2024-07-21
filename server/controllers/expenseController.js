const Expense = require("../models/Expense");
const User = require("../models/User");

exports.addExpense = async (req, res) => {
  const { date, amount, category, description, user } = req.body;

  try {
    const expense = new Expense({
      user,
      date,
      amount,
      category,
      description,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error("Error adding expense:", err.message);
    res.status(500).json({ error: err.message });
  }
};
console.log("a");

exports.getExpenses = async (req, res) => {
  try {
    // const a = await Expense.find();
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (err) {
    console.error("Error fetching expenses:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpense = async (req, res) => {
  const { id } = req.params;
  const { date, amount, category, description } = req.body;
  try {
    const expense = await Expense.findById(id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    expense.date = date;
    expense.amount = amount;
    expense.category = category;
    expense.description = description;
    await expense.save();
    res.json(expense);
  } catch (err) {
    console.error("Error updating expense:", err.message);
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ error: "Expense not found" });

    res.json({ message: "Expense removed" });
  } catch (err) {
    console.error("Error deleting expense:", err.message);
    res.status(500).json({ error: err.message });
  }
};
