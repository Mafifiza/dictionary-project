import React, { useState } from "react";
import axios from "axios";
import "./Dictionary.css";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  function handleResponse(response) {
    setResult(response.data[0]);
  }

  function search(event) {
    event.preventDefault();
    let apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(apiUrl).then(handleResponse);
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

      {result && (
        <div className="Results">
          <h2>{result.word}</h2>
          {result.phonetics[0] && result.phonetics[0].audio && (
            <audio controls src={result.phonetics[0].audio}></audio>
          )}
          <p>
            {result.meanings[0].partOfSpeech} —{" "}
            {result.meanings[0].definitions[0].definition}
          </p>
        </div>
      )}
    </div>
  );
}
