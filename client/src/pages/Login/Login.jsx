import React, { useState, useContext } from "react";
import styles from "./login.module.css";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { login, setUserId } = useContext(AuthContext);

  const validateForm = () => {
    let formErrors = {};
    let valid = true;

    if (!email) {
      formErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = "Email is invalid";
      valid = false;
    }

    if (!password) {
      formErrors.password = "Password is required";
      valid = false;
    }

    setErrors(formErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = { email, password };
      setEmail("");
      setPassword("");
      setErrors({});
      setMessage("");

      try {
        const response = await axios.post(
          "http://localhost:8000/api/auth/login",
          formData
        );
        const { token, success, user } = response.data;
        if (success) {
          setUserId(response.data.user);
          localStorage.setItem("token", token);
          localStorage.setItem("user", user._id);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          login();
          setMessage("Login successful!");
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response) {
          setErrors({ apiError: error.response.data.message });
        } else {
          setErrors({
            apiError: "Something went wrong. Please try again later.",
          });
        }
      }
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.backBtn}>
        <Link to="/">
          <img src="./backbtn.png" alt="backBtn" />
        </Link>
      </div>
      <div className={styles["first-container"]}>
        <div className={styles["inner-container"]}>
          <div className={styles.logo}>
            <h2>Welcome to Expense Tracker</h2>
          </div>
          <form onSubmit={handleSubmit} className={styles["login-form"]}>
            <div className={styles["form-input"]}>
              <label htmlFor="email">Email Id</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email id"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email}</span>
              )}
            </div>
            <div className={styles["form-input"]}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors.password && (
                <span className={styles.error}>{errors.password}</span>
              )}
            </div>
            <div>
              <button type="submit" className={styles["form-btn"]}>
                Log In
              </button>
            </div>
            {message && <p className={styles.success}>{message}</p>}
            {errors.apiError && (
              <p className={styles.error}>{errors.apiError}</p>
            )}
          </form>
          <div className={styles.signup}>
            <p>No account?</p>
            <Link to="/signup" className={styles.signUpLink}>
              SignUp
            </Link>
          </div>
        </div>
      </div>
      <div className={styles["second-container"]}>
        <img
          className={styles.sideImage}
          src="https://www.iiqf.org/images/blog/digital-currency-mob.png"
          alt="img"
        />
      </div>
    </div>
  );
}

export default Login;
