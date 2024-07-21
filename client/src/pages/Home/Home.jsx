import React from "react";
import styles from "./Home.module.css";
import { Link, Outlet } from "react-router-dom";
function Home() {
  return (
    <>
      <main className={styles.hero}>
        <h1 className={styles.title}>Manager Your Expense</h1>
        <h2 className={styles.subtitle}>Control your Money</h2>
        <p className={styles.description}>
          Start Creating your budget and save ton of money
        </p>
        <Link to="/login">
          <button className={styles.button}>Get Started</button>
        </Link>
      </main>
    </>
  );
}

export default Home;
