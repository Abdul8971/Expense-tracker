import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
// import { ExpenseProvider } from "./context/ExpenseContext.jsx";
import ContextProvider from "./context/ContextProvider.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <AuthProvider> */}
      <ContextProvider>
        <App />
      </ContextProvider>
      {/* </AuthProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
