import React from "react";
import { AuthProvider } from "./AuthContext";
import { ExpenseProvider } from "./ExpenseContext";
import { BudgetProvider } from "./BudgetContext";

const ContextProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ExpenseProvider>
        <BudgetProvider>{children}</BudgetProvider>
      </ExpenseProvider>
    </AuthProvider>
  );
};

export default ContextProvider;
