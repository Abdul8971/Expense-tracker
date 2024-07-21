import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <>
      <div className={styles.sideBar}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <div className={styles.link}>
            <img src="./dashboard-icon.png" alt="dashboard-icon" />
            <p>Dashboard</p>
          </div>
        </NavLink>
        <NavLink
          to="/budget"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <div className={styles.link}>
            <img
              src="./budget-icon.png"
              alt="budget-icon"
              className={styles.budget}
            />
            <p>Budgets</p>
          </div>
        </NavLink>
        <NavLink
          to="/expense"
          className={({ isActive }) => (isActive ? styles.active : "")}
        >
          <div className={styles.link}>
            <img src="./expense-icon.png" alt="dashboard-icon" />
            <p>Expenses</p>
          </div>
        </NavLink>
      </div>
    </>
  );
}

export default Sidebar;
