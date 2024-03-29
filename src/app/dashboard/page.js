"use client";
import { useEffect, useState } from "react";
import Footer from "./footer";
import Header from "./header";
import Main from "./main";

export default function DashboardPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [totalSpent, setTotalSpent] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logs, setLogs] = useState([]);
  const isDarkModeLS =
    window.localStorage.getItem("darkMode") === "true" ? true : false;

  useEffect(() => {
    setIsDarkMode(isDarkModeLS);
  }, [isDarkModeLS]);

  const handleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    window.localStorage.setItem("darkMode", newDarkMode.toString());
  };

  return (
    <main
      className={`bg-${isDarkMode ? "black" : "white"} text-${
        isDarkMode ? "white" : "black"
      } h-screen w-full md:px-[75px] lg:px-[100px] xl:px-[200px] overflow-hidden`}
    >
      <Header
        isDarkMode={isDarkMode}
        handleDarkMode={handleDarkMode}
        isLoggedIn={isLoggedIn}
      />
      <Main isDarkMode={isDarkMode} totalSpent={totalSpent} />
      <Footer
        isDarkMode={isDarkMode}
        logs={logs}
        setLogs={setLogs}
        totalSpent={totalSpent}
        setTotalSpent={setTotalSpent}
      />
    </main>
  );
}
