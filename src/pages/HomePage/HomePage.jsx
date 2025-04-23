import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovies = async () => {
      try {
        const results = await getTrendingMovies();
        setMovies(results);
      } catch (err) {
        setError("Failed to fetch trending movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, []);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (movies.length === 0)
    return (
      <p>No trending movies available at the moment.</p>
    );

  return (
    <div>
      <h1 className={styles.header}>
        Trending Movies Today
      </h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
