import React, { useState, useEffect } from "react";
import { useTypewriter, Cursor } from "react-simple-typewriter";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";

const sentences = [
  "Manage Your Expense",
  "Track Your Budgets",
  "Save Your Money",
  "Manage Your Expense",
  "Track Your Budgets",
  "Save Your Money",
];

function Home() {
  const [text, reset] = useTypewriter({
    words: sentences,
    // loop: true,
    typeSpeed: 200,
    deleteSpeed: 50,
    delaySpeed: 1500,
  });

  useEffect(() => {
    return () => {
      reset;
    };
  }, [reset]);

  return (
    <>
      <main className={styles.hero}>
        <h1 className={styles.title}>
          {text}
          <Cursor />
        </h1>
        <h2 className={styles.subtitle}>Control Your Money</h2>
        <p className={styles.description}>
          Start creating your budget and save tons of money
        </p>
        <Link to="/login">
          <button className={styles.button}>Get Started</button>
        </Link>
      </main>
    </>
  );
}

export default Home;
