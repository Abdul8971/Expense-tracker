import React, { useState, useContext, useEffect } from "react";
import styles from "./AddBudget.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { BudgetContext } from "../../context/BudgetContext";

function EditBudget() {
  const { budgets, editBudget } = useContext(BudgetContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    category: "",
    amount: "",
  });

  useEffect(() => {
    const budgetItem = budgets.find((item) => item._id == id);
    if (budgetItem) {
      //   console.log(budgetItem);
      setFormData({
        category: budgetItem.category,
        amount: budgetItem.amount,
      });
    }
  }, [id, budgets]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    editBudget(id, formData);
    navigate("/budget");
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Edit Budget</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            name="category"
            placeholder="Category"
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
          <button
            type="button"
            onClick={() => navigate("/budget")}
            className={styles.button}
          >
            Cancel
          </button>
          <button type="submit" className={styles.button}>
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBudget;
