import React, { useEffect, useState, useContext } from "react";
import ExpenseChart from "../../components/Expensechart/Expensechart";
import styles from "./Dashboard.module.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";

const Dashboard = () => {
  const [totalIncom, setTotalIncom] = useState("");
  const [totalSpend, setTotalSpend] = useState(0);
  const [toggle, setToggle] = useState(false);
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/expense");
      const expenses = response.data;
      const totalAmount = expenses.reduce((sum, item) => sum + item.amount, 0);
      setTotalSpend(totalAmount);
      setTotalIncom(localStorage.getItem("totalIncom"));
    };

    fetchData();
  }, []);

  function handleIncome() {
    setToggle(true);
  }
  function handleChange(e) {
    setTotalIncom(e.target.value);
  }
  function handelSubmit() {
    localStorage.setItem("totalIncom", totalIncom);
    setToggle(false);
  }
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Hi, {userId.username}</h1>
        <p>
          Here's what's happening with your money, Let's manage your expenses
        </p>
      </header>
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <h2>Total Income</h2>
          {toggle ? (
            <div>
              <input
                onChange={handleChange}
                value={totalIncom}
                className={styles.incomInput}
              />
              <button onClick={handelSubmit} className={styles.saveBtn}>
                Save
              </button>
            </div>
          ) : (
            <p>${totalIncom}</p>
          )}
          <div className={styles.editIcon} onClick={handleIncome}>
            <EditIcon />
          </div>
        </div>
        <div className={styles.summaryItem}>
          <h2>Total Spend</h2>
          <p>${totalSpend}</p>
        </div>
      </div>
      <ExpenseChart />
    </div>
  );
};

export default Dashboard;
