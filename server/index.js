const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/budget", budgetRoutes);
// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
