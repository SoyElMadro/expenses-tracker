export default function Header({ isDarkMode, handleDarkMode, isLoggedIn }) {
  return (
    <header
      className={`py-4 border-b ${
        isDarkMode ? "bg-black" : "bg-white"
      } border-b-gray-300 px-[60px]`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {isDarkMode ? (
          <button title="Change to Light Mode" onClick={handleDarkMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-moon"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
            </svg>
          </button>
        ) : (
          <button title="Change to Dark Mode" onClick={handleDarkMode}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-sun"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
              <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7" />
            </svg>
          </button>
        )}

        <div
          className={`${
            isDarkMode ? "text-white" : "text-black"
          } text-xl font-semibold uppercase tracking-wider`}
        >
          Expenses
        </div>

        {isLoggedIn ? (
          <button title="Sign Out">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDarkMode ? "white" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-door-exit"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 12v.01" />
              <path d="M3 21h18" />
              <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5" />
              <path d="M14 7h7m-3 -3l3 3l-3 3" />
            </svg>
          </button>
        ) : (
          <button title="Sign Up">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke={isDarkMode ? "white" : "black"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="icon icon-tabler icons-tabler-outline icon-tabler-door-enter"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M13 12v.01" />
              <path d="M3 21h18" />
              <path d="M5 21v-16a2 2 0 0 1 2 -2h6m4 10.5v7.5" />
              <path d="M21 7h-7m3 -3l-3 3l3 3" />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}
