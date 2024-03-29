"use client";
import { useEffect, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { useRouter } from "next/navigation";

export default function AnalyticsPage() {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logs, setLogs] = useState([]);
  const chartRef = useRef(null);
  const [categoryTotals, setCategoryTotals] = useState([]);

  useEffect(() => {
    const storedLogs =
      JSON.parse(
        typeof window !== "undefined"
          ? window.localStorage.getItem("logs")
          : undefined
      ) || [];
    setLogs(storedLogs);

    const darkMode =
      typeof window !== "undefined"
        ? window.localStorage.getItem("darkMode")
        : undefined;
    setIsDarkMode(darkMode === "true");
  }, []);

  useEffect(() => {
    const calculateCategoryTotals = () => {
      const totals = logs.reduce((acc, log) => {
        const existingCategory = acc.find(
          (item) => item.category === log.category
        );
        if (existingCategory) {
          existingCategory.spent += log.price;
        } else {
          acc.push({ category: log.category, spent: log.price });
        }
        return acc;
      }, []);
      setCategoryTotals(totals);
    };

    calculateCategoryTotals();
  }, [logs]);

  console.log(categoryTotals);

  useEffect(() => {
    const generateChart = async () => {
      const ctx = document.getElementById("donutChart").getContext("2d");
      const chartBorderColor = isDarkMode ? "#000" : "#fff";
      const chartBorderWidth = isDarkMode ? 1 : 2;

      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: categoryTotals.map((item) => item.category),
          datasets: [
            {
              label: "Spent",
              data: categoryTotals.map((item) => item.spent),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9933",
                "#33CC33",
                "#FF3366",
                "#FF66CC",
                "#99FF33",
                "#66CCCC",
                "#FF6666",
                "#CCCC33",
                "#6666FF",
                "#FF33CC",
                "#00CC66",
                "#FF99CC",
                "#6699FF",
                "#FF9966",
                "#66CCFF",
              ],
              borderWidth: chartBorderWidth,
              borderColor: chartBorderColor,
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              position: "top",
            },
          },
          animation: {
            animateRotate: true,
            animateScale: true,
          },
        },
      });
    };

    generateChart();
  }, [categoryTotals]);

  const handleGoBackButton = () => {
    router.push("/dashboard");
  };

  return (
    <section
      className={`sm:h-full max-xl:h-max ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <header
        className={`flex items-center justify-start h-16 ${
          isDarkMode ? "bg-white/30" : "bg-gray-200 text-black"
        }`}
      >
        <button
          onClick={handleGoBackButton}
          className={`ml-4 px-2 rounded-lg text-2xl hover:scale-125 transition-transform ${
            isDarkMode ? "text-white bg-white/40" : "text-black bg-white/90"
          }`}
        >
          &lt;-
        </button>
      </header>
      <h1 className="text-center text-4xl font-semibold py-8">Analytics</h1>
      <main className="pt-3 flex flex-col items-center justify-center">
        <div className="sm:w-1/4 xl:w-1/3">
          <canvas id="donutChart"></canvas>
        </div>
        <div className="sm:w-1/2 xl:w-1/2 mt-28 mx-4">
          <div className="mb-4">
            <ul className="border rounded-lg overflow-hidden">
              {categoryTotals.map((categoryItem, index) => (
                <li
                  key={index}
                  className={`p-4 border-b last:border-0 transition-colors duration-300 select-none ${
                    isDarkMode ? "hover:bg-gray-900" : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center mb-2">
                    <span className="font-semibold text-blue-500">
                      {categoryItem.category}
                    </span>
                    <span className="ml-2 text-gray-600">
                      Total gastado: ${categoryItem.spent}
                    </span>
                    <span className="ml-auto text-2xl">
                      {
                        logs.find(
                          (log) => log.category === categoryItem.category
                        )?.logo
                      }
                    </span>
                  </div>
                  <ul>
                    {logs
                      .filter((log) => log.category === categoryItem.category)
                      .map((log, index) => (
                        <li key={index} className="ml-4">
                          <span className="text-gray-500">
                            {log.time} - ${log.price}
                          </span>
                        </li>
                      ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </section>
  );
}
