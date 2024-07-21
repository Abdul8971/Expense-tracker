import { React, useContext } from "react";
import "./Delete.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { ExpenseContext } from "../../context/ExpenseContext";

function Delete() {
  const { id } = useParams();
  const { deleteExpense } = useContext(ExpenseContext);

  return (
    <>
      <div className="delete-container">
        <div className="delete-innerContainer">
          <div className="delete-img-h2">
            <img src="/warning.png" alt="delete" />
            <h2>Delete</h2>
          </div>
          <p>Are you sure you want to delete?</p>
          <div className="delete-cancel-container">
            <Link to={`/expense`}>
              <button className="cancel">Cancel</button>
            </Link>
            <Link to="/expense">
              <button className="delete" onClick={() => deleteExpense(id)}>
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Delete;
