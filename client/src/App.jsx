import React, { useState, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Navbar from "./components/Navbar/Navbar";
import Dashboard from "./pages/Dashboard/Dashboard";
import Budget from "./pages/Budget/Budget";
import Expenses from "./pages/Expenses/Expenses";
import Layout from "./components/Layout/Layout";
import EditExpence from "./components/EditExpence/EditExpence";
import AddExpence from "./components/AddExpense/AddExpense";
import Delete from "./components/Delete/Delete";
import RefreshHandler from "./components/RefreshHandler";
import { AuthContext } from "./context/AuthContext";
import Logout from "./components/Logout";
import AddBudget from "./components/BudgetsComponent/AddBudget";
import EditBudget from "./components/BudgetsComponent/EditBudget";
import DeleteBudget from "./components/BudgetsComponent/DeleteBudget";
function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/" replace />;
  };

  return (
    <>
      <RefreshHandler setIsAuthenticated={setIsAuthenticated} />
      <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route
            path="dashboard"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            path="budget"
            element={<PrivateRoute element={<Budget />} />}
          />
          <Route
            path="budget/addBudget"
            element={<PrivateRoute element={<AddBudget />} />}
          />
          <Route
            path="budget/editBudget/:id"
            element={<PrivateRoute element={<EditBudget />} />}
          />
          <Route
            path="budget/delete/:id"
            element={<PrivateRoute element={<DeleteBudget />} />}
          />
          <Route
            path="expense"
            element={<PrivateRoute element={<Expenses />} />}
          />
          <Route
            path="expense/add"
            element={<PrivateRoute element={<AddExpence />} />}
          />
          <Route
            path="expense/edit/:id"
            element={<PrivateRoute element={<EditExpence />} />}
          />

          <Route
            path="expense/delete/:id"
            element={<PrivateRoute element={<Delete />} />}
          />
          <Route
            path="/logout"
            element={<PrivateRoute element={<Logout />} />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
