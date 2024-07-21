import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:8000/api";
const BudgetContext = createContext();

let token = localStorage.getItem("token");
const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState([]);

  const fetchBudgets = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/budget`, {
        headers: { Authorization: token },
      });
      setBudgets(response.data);
    } catch (error) {
      console.error("Error fetching budget:", error);
    }
  };

  useEffect(() => {
    fetchBudgets();
  }, []);

  const addBudget = async (newBudget) => {
    try {
      await axios.post(`${BASE_URL}/budget`, newBudget, {
        headers: { Authorization: token },
      });
      fetchBudgets();
    } catch (error) {
      console.error("Error adding budget:", error);
    }
  };

  const editBudget = async (id, updatedBudget) => {
    try {
      await axios.put(`${BASE_URL}/budget/${id}`, updatedBudget, {
        headers: { Authorization: token },
      });
      fetchBudgets();
    } catch (error) {
      console.error("Error editing budget:", error);
    }
  };

  const deleteBudget = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/budget/${id}`, {
        headers: { Authorization: token },
      });
      fetchBudgets();
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  return (
    <BudgetContext.Provider
      value={{ budgets, addBudget, editBudget, deleteBudget }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export { BudgetContext, BudgetProvider };
