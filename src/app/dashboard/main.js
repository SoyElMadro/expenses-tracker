export default function Main({ totalSpent, isDarkMode }) {
  const integerPart = Math.trunc(totalSpent);
  const decimalPart = Math.abs(totalSpent - integerPart)
    .toFixed(2)
    .substring(1);

  return (
    <main className="container flex items-center justify-center mx-auto mt-60 mb-48">
      <div className="text-center">
        <div className="text-gray-400 text-lg mb-4">Spent this month</div>
        <div
          className={`${
            totalSpent < 0
              ? "text-red-600"
              : isDarkMode
              ? "text-white"
              : "text-black"
          } text-7xl`}
        >
          <span className="text-4xl align-top font-semibold">$</span>
          {integerPart}
          <span className="text-4xl align-top">{decimalPart}</span>
        </div>
      </div>
    </main>
  );
}
