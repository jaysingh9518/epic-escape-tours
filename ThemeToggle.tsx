"use client";

import { useEffect, useState } from "react";
import { BsMoonStarsFill, BsSunFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
      setTheme(savedTheme);
    } else {
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-all"
      aria-label="Toggle Dark Mode"
    >
      {theme === "dark" ? (
        <BsSunFill className="text-yellow-500" size={20} />
      ) : (
        <BsMoonStarsFill className="text-blue-500" size={20} />
      )}
    </button>
  );
};

export default ThemeToggle;
