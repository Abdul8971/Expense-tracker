const express = require("express");
const router = express.Router();
const {
  addBudget,
  getBudgets,
  updateBudget,
  deleteBudget,
} = require("../controllers/BudgetController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addBudget);
router.get("/", authMiddleware, getBudgets);
router.put("/:id", authMiddleware, updateBudget);
router.delete("/:id", authMiddleware, deleteBudget);

module.exports = router;
