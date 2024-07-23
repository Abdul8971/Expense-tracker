import React, { useContext, useEffect, useState } from "react";
import styles from "./Expenses.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ExpenseContext } from "../../context/ExpenseContext";

function Expenses() {
  const { expenses } = useContext(ExpenseContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const categaries = expenses.map((item) => {
      return item.category.toLowerCase();
    });
    let a = new Set(categaries);
    setCategory(() => ["All", ...a]);
    // console.log(a);
  }, [expenses]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const filteredExpenses = expenses.filter((expense) => {
    const matchesSearchTerm = expense.category
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" ||
      expense.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearchTerm && matchesCategory;
  });

  return (
    <>
      <div className={styles["inner-container"]}>
        <div className={styles.header}>
          <div>
            <SearchIcon className={styles.searchIcon} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search..."
            />

            <select value={selectedCategory} onChange={handleCategoryChange}>
              {category.map((value, index) => {
                return (
                  <option value={value} key={index}>
                    {value}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <Link to="/expense/add">
              <button>Add New</button>
            </Link>
          </div>
        </div>
        <section className={styles["table-section"]}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Amount</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Date</th>
                <th className={styles.th}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.map((expense) => (
                <tr className={styles.tr} key={expense._id}>
                  <td className={styles.td}>{expense.category}</td>
                  <td className={styles.td}>{expense.amount}</td>
                  <td className={styles.dtDescription}>
                    <details>{expense.description}</details>
                    <summary>{expense.description.slice(0, 20)}</summary>
                  </td>
                  <td className={styles.td}>
                    {expense.date
                      ? expense.date.slice(0, 10).split("-").reverse().join("-")
                      : "No Date"}
                  </td>
                  <td className={styles.td}>
                    <button className={styles.edit}>
                      <Link to={`/expense/edit/${expense._id}`}>
                        <EditIcon />
                      </Link>
                    </button>
                    <Link to={`/expense/delete/${expense._id}`}>
                      <button className={styles.delete}>
                        <DeleteIcon />
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}

export default Expenses;
