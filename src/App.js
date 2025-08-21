import React, { useState } from "react";
import Dictionary from "./Dictionary";
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`App ${darkMode ? "dark-theme" : "light-theme"}`}>
      <div className="app-container">
        <div className="theme-toggle">
          <button onClick={toggleDarkMode} className="theme-btn">
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>
        <Dictionary />
        <footer>
          This project was coded by{" "}
          <a
            href="https://github.com/Mafifiza"
            target="_blank"
            rel="noopener noreferrer"
          >
            Refilwe Motaung
          </a>{" "}
          and is{" "}
          <a
            href="https://github.com/Mafifiza/dictionary-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            open-sourced on GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://planetwords.netlify.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            hosted on Netlify
          </a>
        </footer>
      </div>
    </div>
  );
}
