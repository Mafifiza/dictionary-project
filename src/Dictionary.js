import React from "react";
import "./Dictionary.css";

export default function Dictionary() {
  return (
    <div className="Dictionary">
      <header className="dictionary-header">
        <h1>Word Explorer</h1>
        <p>Discover definitions and visual representations</p>
      </header>
      <form>
        <input type="search" placeholder="Search for a word..." />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
