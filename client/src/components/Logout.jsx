import React, { useEffect, useContext } from "react";
import "../components/Delete/Delete.css";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/");
  }
  return (
    <>
      <div className="delete-container">
        <div className="delete-innerContainer">
          <div className="delete-img-h2">
            <img src="/warning.png" alt="delete" />
            <h2>Logout</h2>
          </div>
          <p>Are you sure you want to logout?</p>
          <div className="delete-cancel-container">
            <Link to={`/dashboard`}>
              <button className="cancel">Cancel</button>
            </Link>
            <button
              className="delete"
              style={{ marginBottom: "27px" }}
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Logout;
