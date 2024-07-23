import React, { useState, useContext } from "react";
import styles from "./AddBudget.module.css";
import { Link, useNavigate } from "react-router-dom";
import { BudgetContext } from "../../context/BudgetContext";

function AddBudget() {
  const { budget, addBudget } = useContext(BudgetContext);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(formData);
    addBudget(formData);
    setFormData({
      category: "",
      amount: "",
    });
    navigate("/budget");
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Add Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="category"
            placeholder="Add Budget"
            className={styles.inputField}
            value={formData.category}
            required
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            required
            className={styles.inputField}
            value={formData.amount}
            onChange={handleChange}
          />
        </div>
        <div className={styles.buttonContainer}>
          <Link to="/budget">
            <button type="submit" className={styles.button}>
              Cancel
            </button>
          </Link>
          <button type="submit" className={styles.button}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBudget;
