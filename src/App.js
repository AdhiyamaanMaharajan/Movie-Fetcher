import React, { useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetchMovieHanlder();
  }, []);

  async function fetchMovieHanlder() {
    setIsLoding(true);
    setError(null);
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      const data = await response.json();

      if (!response.ok) {
        throw new error("Something went wrong");
      }
      // .then((response) => {
      //   return response.json();
      // })
      // .then((data) => {
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);

      // });
    } catch (error) {
      setError(error.message);
    }
    setIsLoding(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHanlder}>Fetch Movies</button>
      </section>
      <section>
        {!isLoding && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoding && movies.length === 0 && !error && "not found."}
        {!isLoding && error && <p>{error}</p>}
        {isLoding && "taking a while..."}
      </section>
    </React.Fragment>
  );
}

export default App;
