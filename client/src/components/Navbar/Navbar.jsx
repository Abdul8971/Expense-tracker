import { React, useContext } from "react";
import styles from "./Navbar.module.css";
import { AuthContext } from "../../context/AuthContext";

import { Link } from "react-router-dom";
function Navbar() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
    <>
      <header className={styles.header}>
        <img src="./expense-logo.png" alt="Logo" className={styles.logo} />
        <nav className={styles.nav}>
          {!isAuthenticated ? (
            <Link to="/login">
              <button className={styles.button}>Get Started</button>
            </Link>
          ) : (
            <Link to="/logout">
              <button className={styles.button}>Logout</button>
            </Link>
          )}
        </nav>
      </header>
    </>
  );
}

export default Navbar;
