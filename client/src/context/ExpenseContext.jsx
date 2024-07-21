import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
let BASE_URL = "http://localhost:8000/api";

const ExpenseContext = createContext();
// console.log(token);
const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/expense`);
      setExpenses(response.data);
      // console.log(expenses);
    } catch (error) {
      console.error("Error fetching expense:", error);
    }
  };
  useEffect(() => {
    fetchExpenses();
  }, []);

  const addExpense = async (newExpense) => {
    try {
      await axios.post(`${BASE_URL}/expense`, newExpense);
      fetchExpenses();
      // console.log(newExpense);
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const editExpense = async (id, updatedExpense) => {
    try {
      // console.log(id, updatedExpense);
      await axios.put(`${BASE_URL}/expense/${id}`, updatedExpense);
      fetchExpenses();
    } catch (error) {
      console.error("Error editing expense:", error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/expense/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <ExpenseContext.Provider
      value={{ expenses, addExpense, editExpense, deleteExpense }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};

export { ExpenseContext, ExpenseProvider };
