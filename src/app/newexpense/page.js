"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const CATEGORIES = {
  HEALTH: {
    name: "Health",
    logo: "❤️",
  },
  VACATION: {
    name: "Vacation",
    logo: "⛱️",
  },
  FOOD: {
    name: "Food",
    logo: "🍔",
  },
  EDUCATION: {
    name: "Education",
    logo: "📚",
  },
  RENT: {
    name: "Rent",
    logo: "🏠",
  },
  GIFT: {
    name: "Gift",
    logo: "🎁",
  },
  CLOTHES: {
    name: "Clothes",
    logo: "👕",
  },
  GAS: {
    name: "Gas",
    logo: "⛽",
  },
  FESTIVITY: {
    name: "Festivity",
    logo: "🎉",
  },
  ENTERTAINMENT: {
    name: "Entertainment",
    logo: "🎮",
  },
};

export default function NewExpensePage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const date = new Date();
  const [options, setOptions] = useState(
    Object.values(CATEGORIES).map((category) => {
      return {
        name: category.name,
        emoji: category.logo,
      };
    })
  );
  const [selectedOption, setSelectedOption] = useState("Health");
  const [amount, setAmount] = useState(0);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryEmoji, setNewCategoryEmoji] = useState("");
  const [showNewCategoryInputs, setShowNewCategoryInputs] = useState(false);

  useEffect(() => {
    const darkMode = window.localStorage.getItem("darkMode");
    setIsDarkMode(darkMode === "true");
  }, []);

  const handleClick = () => {
    if (amount == 0 || amount < 0) {
      return router.push("/newexpense");
    }
    const selectedCategory = options.find(
      (option) => option.name === selectedOption
    );

    if (selectedCategory) {
      const selectedLogo = selectedCategory.emoji;

      if (typeof window !== 'undefined') {
        window.localStorage.setItem("selectedLogo", selectedLogo);
      }
    } else {
      console.error(
        "La opción seleccionada no se encontró en el array de opciones."
      );
    }

    if (typeof window !== "undefined") {
      window.localStorage.setItem("selectedCategory", selectedOption);
      window.localStorage.setItem("amountSpent", amount);
      window.localStorage.setItem("timeAdded", Date());
      window.localStorage.setItem("exactlySec", date.getTime());
    }

    router.push("/dashboard");
  };

  const handleCancel = () => {
    router.push("/");
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleAddOption = () => {
    if (newCategoryName.trim() !== "") {
      setOptions((prevOptions) => [
        ...prevOptions,
        {
          name: newCategoryName,
          emoji: newCategoryEmoji,
        },
      ]);
      setSelectedOption(newCategoryName);
      setNewCategoryName("");
      setNewCategoryEmoji("");
    }
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const handleNewCategoryNameChange = (event) => {
    setNewCategoryName(event.target.value);
  };

  const handleNewCategoryEmojiChange = (event) => {
    setNewCategoryEmoji(event.target.value);
  };

  const toggleNewCategoryInputs = () => {
    setShowNewCategoryInputs(!showNewCategoryInputs);
  };

  return (
    <section
      className={`w-full h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <main className="flex flex-col items-center justify-center h-screen w-full">
        <div className="flex flex-col items-center">
          <p className="text-gray-400">Today at {date.toDateString()}</p>
          <input
            min={0}
            type="number"
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount"
            className={`mt-4 px-4 py-2 border border-gray-300 rounded-md ${
              isDarkMode ? "bg-black" : ""
            }`}
          />
        </div>
        <div>
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            className={`cursor-pointer mt-4 px-4 py-2 border border-gray-300 rounded-md ${
              isDarkMode ? "bg-black" : ""
            }`}
          >
            {options.map((option, index) => (
              <option key={index} value={option.name}>
                {option.emoji} {option.name}
              </option>
            ))}
          </select>
          {showNewCategoryInputs ? (
            <button
              onClick={() => {
                handleAddOption();
                toggleNewCategoryInputs();
              }}
              className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-md"
            >
              Add Option
            </button>
          ) : (
            <button
              onClick={() => {
                handleAddOption();
                toggleNewCategoryInputs();
              }}
              className="ml-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-md"
            >
              New Option
            </button>
          )}
        </div>
        {showNewCategoryInputs && (
          <div className="flex flex-col items-center mt-1 transition-opacity duration-300 opacity-80 hover:opacity-100">
            <input
              type="text"
              value={newCategoryName}
              onChange={handleNewCategoryNameChange}
              placeholder="New Category Name"
              className={`mt-4 px-4 py-2 border border-gray-300 rounded-md ${
                isDarkMode ? "bg-black" : ""
              }`}
            />
            <input
              type="text"
              value={newCategoryEmoji}
              onChange={handleNewCategoryEmojiChange}
              placeholder="Win + . => Emoji"
              className={`mt-4 px-4 py-2 border border-gray-300 rounded-md ${
                isDarkMode ? "bg-black" : ""
              }`}
            />
          </div>
        )}
        <div className="flex gap-x-4 mt-4">
          <button
            onClick={handleCancel}
            className={`py-2 px-6 rounded-lg  transition-colors duration-300 ${
              isDarkMode
                ? "bg-red-500/70 text-white/80 hover:bg-red-500/90 hover:text-white"
                : "bg-red-500/30 text-black/80 hover:bg-red-500/50"
            }`}
          >
            Cancel
          </button>
          <button
            onClick={handleClick}
            className={`py-2 px-6 rounded-lg transition-colors duration-300 ${
              isDarkMode
                ? "bg-green-500/70 text-white/80 hover:bg-green-500/90 hover:text-white"
                : "bg-green-500/30 text-black/80 hover:bg-green-500/50"
            }`}
          >
            Next
          </button>
        </div>
      </main>
    </section>
  );
}
