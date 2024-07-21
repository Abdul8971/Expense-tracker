import React, { useState, useContext, useEffect } from "react";
import styles from "../EditExpence/EditExpence.module.css";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ExpenseContext } from "../../context/ExpenseContext";

function EditExpense() {
  const { id } = useParams();
  const { expenses, editExpense } = useContext(ExpenseContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const expense = expenses.find((exp) => exp._id === id);
    if (expense) {
      setCategory(expense.category);
      setAmount(expense.amount);
      setDescription(expense.description);
      setDate(expense.date);
    }
  }, [id, expenses]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedExpense = { category, amount, description, date };
    editExpense(id, updatedExpense);
    navigate("/expense");
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Edit Expense</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Category</label>
          <input
            type="text"
            className={styles.input}
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Amount</label>
          <input
            type="number"
            className={styles.input}
            value={amount}
            required
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Description</label>
          <textarea
            type="text"
            rows={5}
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className={styles["form-group"]}>
          <label className={styles.label}>Date</label>
          <input
            type="date"
            className={styles.input}
            value={date}
            required
            onChange={(e) => setDate(e.target.value)}
          />
          <div>
            <Link to="/expense">
              <button className={styles["cancel-btn"]}>Cancel</button>
            </Link>
            <button type="submit" className={styles["save-btn"]}>
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditExpense;
