import { useRouter } from "next/navigation";

export default function Menu({ isDarkMode }) {
  const router = useRouter();

  const handleAnalyticsAnchor = (e) => {
    e.preventDefault();
    router.push("/analytics");
  };

  const handleNewExpense = (e) => {
    e.preventDefault();
    router.push("/newexpense");
  };

  const handleLogsAnchor = (e) => {
    e.preventDefault();
    router.push("/logs");
  };

  return (
    <nav
      className={
        "fixed bottom-0 left-0 text-center w-full " +
        (isDarkMode ? "bg-black text-white" : "bg-white text-black")
      }
    >
      <div className="py-2 flex items-center justify-around">
        <div
          className={
            "cursor-pointer flex flex-col items-center text-sm hover:scale-110 active:underline transition-transform select-none " +
            (isDarkMode ? "text-white" : "text-black")
          }
        >
          <button
            className="flex flex-col items-center"
            onClick={handleAnalyticsAnchor}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-chart-donut"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M10 3.2a9 9 0 1 0 10.8 10.8a1 1 0 0 0 -1 -1h-3.8a4.1 4.1 0 1 1 -5 -5v-4a.9 .9 0 0 0 -1 -.8" />
              <path d="M15 3.5a9 9 0 0 1 5.5 5.5h-4.5a9 9 0 0 0 -1 -1v-4.5" />
            </svg>
            <span>Analytics</span>
          </button>
        </div>
        <div className="cursor-pointer ml-[-24px]">
          <button
            className={
              "size-12 rounded-full inline-block text-4xl pb-[5.5px] transition-all select-none hover:scale-110 " +
              (isDarkMode
                ? "bg-white/20 text-white hover:bg-white/90 hover:text-black active:bg-white/20 active:text-white"
                : "bg-blue-400 hover:bg-blue-300 active:bg-blue-500 active:text-white")
            }
            onClick={handleNewExpense}
          >
            +
          </button>
        </div>
        <div
          className={
            "cursor-pointer flex flex-col items-center text-sm hover:scale-110 active:underline transition-transform select-none " +
            (isDarkMode ? "text-white" : "text-black")
          }
        >
          <button
            className="flex flex-col items-center"
            onClick={handleLogsAnchor}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-logs"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 12h.01" />
              <path d="M4 6h.01" />
              <path d="M4 18h.01" />
              <path d="M8 18h2" />
              <path d="M8 12h2" />
              <path d="M8 6h2" />
              <path d="M14 6h6" />
              <path d="M14 12h6" />
              <path d="M14 18h6" />
            </svg>
            <span>Logs</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
