import Menu from "./menu";
import { useEffect } from "react";

export default function Footer({
  isDarkMode,
  totalSpent,
  setTotalSpent,
  setLogs,
  logs,
}) {
  useEffect(() => {
    const selectedCategory = window.localStorage.getItem("selectedCategory");
    const selectedLogo = window.localStorage.getItem("selectedLogo");
    const amountSpent = window.localStorage.getItem("amountSpent");
    const timeAdded = window.localStorage.getItem("timeAdded");
    const exactlySec = window.localStorage.getItem("exactlySec");

    if (selectedCategory && amountSpent) {
      const existingLogs = JSON.parse(window.localStorage.getItem("logs")) || [];
      const isNewLogDuplicate = existingLogs.some(
        (log) =>
          log.category === selectedCategory &&
          log.price === parseFloat(amountSpent) &&
          log.logo === selectedLogo &&
          log.time === formatTime(new Date(timeAdded)) &&
          log.exactlySec === exactlySec
      );

      if (!isNewLogDuplicate) {
        const newLog = {
          category: selectedCategory,
          price: parseFloat(amountSpent),
          logo: selectedLogo || "❓",
          time: formatTime(new Date(timeAdded)),
          exactlySec: exactlySec,
        };

        const newLogs = [...existingLogs, newLog];

        window.localStorage.setItem("logs", JSON.stringify(newLogs));
        setLogs(newLogs);
      }
    }
  }, []);

  useEffect(() => {
    const newTotalSpent = logs.reduce((acc, item) => acc + item.price, 0);
    setTotalSpent(newTotalSpent - newTotalSpent * 2);
  }, [logs, setTotalSpent]);

  useEffect(() => {
    const storedLogs = JSON.parse(window.localStorage.getItem("logs")) || [];
    setLogs(storedLogs);
  }, []);

  const formatTime = (date) => {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <footer className="pb-16">
      <header className="flex w-full border-t border-t-gray-300 border-b border-b-gray-200 relative">
        <div className="flex flex-row my-2 ml-3">
          <h4 className="text-sm text-gray-400">Today</h4>
          <h4 className="text-sm text-gray-400 absolute right-3">
            ${totalSpent.toFixed(2)}
          </h4>
        </div>
      </header>
      <main className="m-2 list-none">
        {logs
          .slice()
          .reverse()
          .map((item, key) => {
            return (
              <li
                key={key}
                className="flex align-middle items-center justify-center mb-2"
              >
                <div className="ml-1 mr-3">{item.logo}</div>
                <div className="flex flex-col">
                  <div className="text-md">{item.category}</div>
                  <div
                    className={`${
                      isDarkMode ? "text-white/70" : "text-gray-700"
                    } text-xs`}
                  >
                    {item.time}
                  </div>
                </div>
                <div className={`ml-auto ${isDarkMode ? "text-red-400" : "text-red-600"}`}>-{item.price}$</div>
              </li>
            );
          })}
      </main>
      <Menu isDarkMode={isDarkMode} />
    </footer>
  );
}
