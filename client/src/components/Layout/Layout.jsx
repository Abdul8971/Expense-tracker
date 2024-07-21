import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
function Layout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div className={styles.content}>
        <Outlet />
      </div>
    </div>
  );
}

export default Layout;
