import React, { useState } from "react";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");

  function search(event) {
    event.preventDefault();
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="Dictionary">
      <header className="dictionary-header">
        <h1>Word Explorer</h1>
        <p>Discover definitions and visual representations</p>
      </header>
      <form onSubmit={search}>
        <input
          type="search"
          placeholder="Search for a word..."
          onChange={handleKeywordChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
