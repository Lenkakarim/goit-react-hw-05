import React, { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/api";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
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
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <Link
              to={`/movies/${movie.id}`}
              className={styles.movieLink}
            >
              {movie.poster_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title || movie.name}
                  className={styles.poster}
                />
              )}
              <h2 className={styles.movieTitle}>
                {movie.title || movie.name}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
