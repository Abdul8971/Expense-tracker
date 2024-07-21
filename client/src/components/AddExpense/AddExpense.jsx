import React, { useState, useContext } from "react";
import { ExpenseContext } from "../../context/ExpenseContext";
import styles from "../EditExpence/EditExpence.module.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function AddExpense() {
  const { addExpense } = useContext(ExpenseContext);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  // const { userId, setUserId } = useContext(AuthContext);
  const navigate = useNavigate();
  let userId = localStorage.getItem("user");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      user: userId,
      category,
      amount,
      description,
      date,
    };
    await addExpense(expenseData);
    // console.log(expenseData);
    setCategory("");
    setAmount("");
    setDescription("");
    setDate("");
    navigate("/expense");
  };

  return (
    <div className={styles["form-container"]}>
      <h3>Add Expense</h3>
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

export default AddExpense;
