import React, { useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ExpenseChart = () => {
  const [chartData, setChartData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/expense", {
          headers: { Authorization: token },
        });
        const expenses = response.data;

        const categoryTotals = expenses.reduce((acc, expense) => {
          const { category, amount } = expense;
          if (!acc[category]) {
            acc[category] = 0;
          }
          acc[category] += amount;
          return acc;
        }, {});

        const formattedData = {
          labels: Object.keys(categoryTotals),
          datasets: [
            {
              label: "Amount",
              data: Object.values(categoryTotals),
              backgroundColor: "rgba(136, 132, 216, 0.6)",
            },
          ],
        };

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    };

    fetchExpenses();
  }, [token]);

  return (
    <>
      <h3
        style={{ textAlign: "center", marginBottom: "40px", marginTop: "30px" }}
      >
        Expense by Category
      </h3>
      <div
        style={{
          height: "290px",
          width: "80%",
          marginLeft: "auto",
        }}
      >
        {chartData && chartData.labels ? (
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: true, position: "top" },
                tooltip: { enabled: true },
              },
            }}
          />
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

export default ExpenseChart;
