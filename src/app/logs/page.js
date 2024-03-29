"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LogsPage() {
  const router = useRouter();
  const [logs, setLogs] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(storedLogs);

    const darkMode = localStorage.getItem("darkMode");
    setIsDarkMode(darkMode === "true");
  }, []);

  useEffect(() => {
    const selectedCategory = localStorage.getItem("selectedCategory");
    const selectedLogo = localStorage.getItem("selectedLogo");
    const amountSpent = localStorage.getItem("amountSpent");
    const timeAdded = localStorage.getItem("timeAdded");

    if (selectedCategory && amountSpent) {
      const existingLogs = JSON.parse(localStorage.getItem("logs")) || [];
      const isNewLogDuplicate = existingLogs.some(
        (log) =>
          log.category === selectedCategory &&
          log.price === parseFloat(amountSpent) &&
          log.logo === selectedLogo &&
          log.time === formatTime(new Date(timeAdded))
      );

      if (!isNewLogDuplicate) {
        const newLog = {
          category: selectedCategory,
          price: parseFloat(amountSpent),
          logo: selectedLogo || "❓",
          time: formatTime(new Date(timeAdded)),
        };

        const newLogs = [...existingLogs, newLog];

        localStorage.setItem("logs", JSON.stringify(newLogs));
        setLogs(newLogs);
        console.log("todo añadido");
      }
    }
  }, []);

  useEffect(() => {
    const storedLogs = JSON.parse(localStorage.getItem("logs")) || [];
    setLogs(storedLogs);
  }, []);

  const handleGoBackButton = () => {
    router.push("/dashboard");
  };

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <section
      className={`flex flex-col h-max ${
        isDarkMode ? "bg-white/10 text-white" : "bg-white text-black"
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
      <main className="flex-1 flex flex-col justify-center items-center">
        <h1
          className={`text-4xl font-bold py-12 ${
            isDarkMode ? "text-white" : "text-black"
          }`}
        >
          Logs from the day:
        </h1>
        <ul className="max-sm:w-[80%] w-full max-w-md overflow-y-auto">
          {logs
            .slice()
            .reverse()
            .map((item, key) => {
              return (
                <li
                  key={key}
                  className={`flex items-center justify-between ${
                    isDarkMode
                      ? "bg-white/10 shadow-white/30 shadow-sm"
                      : "bg-gray-100 shadow-md"
                  } rounded-md p-4 my-2`}
                >
                  <div className="flex items-center space-x-2">
                    <div
                      className={`${
                        isDarkMode ? "text-white" : "text-black"
                      } text-2xl`}
                    >
                      {item.logo}
                    </div>
                    <div>
                      <div
                        className={`${
                          isDarkMode ? "text-white" : "text-black"
                        } font-semibold`}
                      >
                        {item.category}
                      </div>
                      <div
                        className={`${
                          isDarkMode ? "text-gray-300" : "text-gray-500"
                        } text-sm`}
                      >
                        {item.time}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${
                      isDarkMode ? "text-red-400" : "text-red-500"
                    } font-semibold`}
                  >
                    -{item.price}$
                  </div>
                </li>
              );
            })}
        </ul>
      </main>
    </section>
  );
}