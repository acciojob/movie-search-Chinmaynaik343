
import React, { useState } from "react";
import ".styles/App.css";

const API_KEY = "99eb9fd1";

function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchMovies = async () => {
    if (!search.trim()) {
      setMovies([]);
      setError("Invalid movie name. Please try again.");
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(search.trim())}&type=movie`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search || []);
      } else {
        setError("Invalid movie name. Please try again.");
      }
    } catch (err) {
      setError("Invalid movie name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchMovies();
    }
  };

  return (
    <div className="app">
      <h1>Movie Search</h1>

      <div className="search-container">
        <input
          id="searchInput"
          type="text"
          placeholder="Enter movie name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button id="searchButton" onClick={searchMovies}>
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={
                movie.Poster && movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://placehold.co/200x300?text=No+Poster"
              }
              alt={movie.Title}
            />

            <h3>{movie.Title}</h3>
            <p>Release Year: {movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
