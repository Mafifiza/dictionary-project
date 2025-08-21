import React, { useState } from "react";
import "./Dictionary.css";
import axios from "axios";

export default function Dictionary() {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState(null);

  function handleDictionaryResponse(response) {
    setResult(response.data[0]);
  }

  function search(event) {
    event.preventDefault();

    // Dictionary API
    let dictionaryApiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${keyword}`;
    axios.get(dictionaryApiUrl).then(handleDictionaryResponse);
  }

  function handleKeywordChange(event) {
    setKeyword(event.target.value);
  }

  // Helper function to find specific part of speech
  const getMeaningByPartOfSpeech = (partOfSpeech) => {
    return result.meanings.find(
      (meaning) =>
        meaning.partOfSpeech.toLowerCase() === partOfSpeech.toLowerCase()
    );
  };

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

          {/* Audio pronunciation */}
          {result.phonetics[0] && result.phonetics[0].audio && (
            <audio controls src={result.phonetics[0].audio}></audio>
          )}

          {/* Main definition (usually noun) */}
          {result.meanings[0] && (
            <div className="meaning">
              <h3>{result.meanings[0].partOfSpeech}</h3>
              <p>{result.meanings[0].definitions[0].definition}</p>
            </div>
          )}

          {/* Adjective section */}
          {getMeaningByPartOfSpeech("adjective") && (
            <div className="meaning">
              <h3>Adjective</h3>
              <p>
                {
                  getMeaningByPartOfSpeech("adjective").definitions[0]
                    .definition
                }
              </p>

              {/* Synonyms for adjective */}
              {getMeaningByPartOfSpeech("adjective").synonyms.length > 0 && (
                <div className="synonyms">
                  <strong>Synonyms: </strong>
                  {getMeaningByPartOfSpeech("adjective").synonyms.join(", ")}
                </div>
              )}
            </div>
          )}

          {/* All synonyms from all meanings */}
          {result.meanings.some((meaning) => meaning.synonyms.length > 0) && (
            <div className="all-synonyms">
              <h4>Synonyms</h4>
              <div className="synonyms-list">
                {result.meanings.map(
                  (meaning) =>
                    meaning.synonyms.length > 0 && (
                      <div key={meaning.partOfSpeech}>
                        <strong>{meaning.partOfSpeech}: </strong>
                        {meaning.synonyms.slice(0, 5).join(", ")}
                        {meaning.synonyms.length > 5 && "..."}
                      </div>
                    )
                )}
              </div>
            </div>
          )}

          {/* Display all meanings for completeness */}
          <div className="all-meanings">
            <h4>All Meanings</h4>
            {result.meanings.map((meaning, index) => (
              <div key={index} className="meaning">
                <h5>{meaning.partOfSpeech}</h5>
                <ul>
                  {meaning.definitions.slice(0, 3).map((def, defIndex) => (
                    <li key={defIndex}>{def.definition}</li>
                  ))}
                </ul>

                {/* Synonyms for this specific meaning */}
                {meaning.synonyms.length > 0 && (
                  <div className="meaning-synonyms">
                    <strong>Synonyms: </strong>
                    {meaning.synonyms.slice(0, 4).join(", ")}
                    {meaning.synonyms.length > 4 && "..."}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
