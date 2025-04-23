import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/api";
import SearchForm from "../../components/SearchForm/SearchForm";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const movieName = searchParams.get("query") ?? "";

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const results = await searchMovies(movieName);
        setMovies(results);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieName]);

  const handleSubmit = (value) => {
    setSearchParams(value !== "" ? { query: value } : {});
    setMovies([]);
  };

  return (
    <div className={styles.movies}>
      <SearchForm onSubmit={handleSubmit} />

      {isLoading && <Loader className={styles.loader} />}

      {!isLoading && movieName && movies.length === 0 && (
        <p className={styles.errorMessage}>
          We don't have any movies "{movieName}". Try again!
        </p>
      )}

      {!isLoading && movies.length > 0 && (
        <MovieList
          movies={movies}
          from={`/movies?query=${movieName}`}
        />
      )}
    </div>
  );
};

export default MoviesPage;
