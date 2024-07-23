const Budget = require("../models/Budget");

exports.addBudget = async (req, res) => {
  const { amount, category } = req.body;
  try {
    const budget = new Budget({
      user: req.user.id,
      category,
      amount,
    });
    // console.log(budget);
    await budget.save();
    res.status(201).json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// { user: req.user.id }
exports.getBudgets = async (req, res) => {
  // console.log(req.headers.authorization);
  try {
    const budget = await Budget.find({ user: req.user.id });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBudget = async (req, res) => {
  const { id } = req.params;
  const { amount, category } = req.body;
  try {
    const budget = await Budget.findById(id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    // if (budget.user.toString() !== req.user.id)
    //   return res.status(401).json({ error: "Unauthorized" });

    budget.amount = amount;
    budget.category = category;
    await budget.save();
    res.json(budget);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteBudget = async (req, res) => {
  const { id } = req.params;
  try {
    const budget = await Budget.findByIdAndDelete(id);
    if (!budget) return res.status(404).json({ error: "Budget not found" });

    // if (budget.user.toString() !== req.user.id)
    //   return res.status(401).json({ error: "Unauthorized" });

    // await budget.remove();
    res.json({ message: "Budget removed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.autherizationText=async(res,req)=>{

// }
