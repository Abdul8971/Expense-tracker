import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

const ExpenseChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expense");
        const expenses = response.data;

        const categoryTotals = expenses.reduce((acc, expense) => {
          const { category, amount } = expense;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += amount;
          return acc;
        }, {});

        const formattedData = Object.keys(categoryTotals).map((key) => ({
          category: key,
          amount: categoryTotals[key],
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    fetchExpenses();
  });

  return (
    <div>
      <h3
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "30px" }}
      >
        Expense by Category
      </h3>
      <BarChart
        width={600}
        height={300}
        data={chartData}
        style={{ margin: "auto" }}
      >
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </div>
  );
};

export default ExpenseChart;
