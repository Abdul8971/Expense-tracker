import React, { useContext } from "react";
import styles from "./Budget.module.css";
import { BudgetContext } from "../../context/BudgetContext";
import { ExpenseContext } from "../../context/ExpenseContext";
import { Link, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Budget = () => {
  const { budgets, deleteBudget } = useContext(BudgetContext);
  const { expenses } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const summary = expenses.reduce((acc, entry) => {
    const { category, amount } = entry;
    if (!acc[category]) {
      acc[category] = { count: 0, spend: 0 };
    }
    acc[category].count += 1;
    acc[category].spend += amount;
    return acc;
  }, {});

  const resultArray = Object.keys(summary).map((key) => ({
    category: key,
    count: summary[key].count,
    spend: summary[key].spend,
  }));

  const handleDelete = (id) => {
    deleteBudget(id);
  };

  return (
    <div className={styles.budgetList}>
      <Link to="/budget/addBudget" className={styles.createBudget}>
        <div>
          <div className={styles.createNewBudget}>
            <span>+</span>
            <p>Create New Budget</p>
          </div>
        </div>
      </Link>
      {budgets.map((budget) => (
        <div key={budget._id} className={styles.budgetItem}>
          <div className={styles.budgetHeader}>
            <div className={styles.budgetTitle}>{budget.category}</div>
            <div className={styles.budgetAmount}>${budget.amount}</div>
            <div className={styles.budgetActions}>
              <Link to={`/budget/editBudget/${budget._id}`}>
                <EditIcon className={styles.actionIcon} />
              </Link>
              <Link to={`/budget/delete/${budget._id}`}>
                <DeleteIcon />
              </Link>
            </div>
          </div>
          {resultArray.map((value) => {
            if (value.category === budget.category) {
              return (
                <div className={styles.budgetDetails} key={budget._id}>
                  <div className={styles.budgetCount}>{value.count} item</div>
                  <div className={styles.spendContainer}>
                    <div className={styles.budgetSpend}>
                      {value.spend} Spend
                    </div>
                    <div className={styles.budgetRemaining}>
                      {budget.amount >= value.spend ? (
                        <p>
                          {budget.amount - value.spend}
                          <span style={{ marginLeft: "5px" }}>Remaining</span>
                        </p>
                      ) : (
                        <p style={{ color: "red", display: "inline" }}>
                          {budget.amount - value.spend} over budget
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
          <div className={styles.budgetBar}>
            <div
              className={styles.budgetBarFill}
              style={{
                width: `${
                  (resultArray.find(
                    (value) => value.category === budget.category
                  )?.spend /
                    budget.amount) *
                  100
                }% `,
              }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Budget;
