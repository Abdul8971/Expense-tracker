import { React, useContext } from "react";
import "../Delete/Delete.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { BudgetContext } from "../../context/BudgetContext";

function DeleteBudget() {
  const { id } = useParams();
  const { deleteBudget } = useContext(BudgetContext);

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
            <Link to={`/budget`}>
              <button className="cancel">Cancel</button>
            </Link>
            <Link to="/budget">
              <button className="delete" onClick={() => deleteBudget(id)}>
                Delete
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DeleteBudget;
