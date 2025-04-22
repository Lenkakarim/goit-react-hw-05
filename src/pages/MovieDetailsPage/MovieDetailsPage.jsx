import React, { useEffect, useState, useRef } from "react";
import {
  NavLink,
  Outlet,
  useParams,
  Link,
  useLocation,
} from "react-router-dom";
import { getMovieDetails } from "../../services/api";
import Loader from "../../components/Loader/Loader";
import styles from "./MovieDetailsPage.module.css";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(
    location.state?.from || "/movies"
  );

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div className={styles.container}>
      <NavLink
        className={styles.backButton}
        to={backLinkRef.current}
      >
        ← Back
      </NavLink>
      <h1 className={styles.title}>{movie.title}</h1>

      <p className={styles.textBlock}>
        <strong>Overview:</strong> {movie.overview}
      </p>
      <p className={styles.textBlock}>
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <p className={styles.textBlock}>
        <strong>Rating:</strong> {movie.vote_average}
      </p>

      {movie.poster_path && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.poster}
        />
      )}

      <div className={styles.links}>
        <Link to="cast" className={styles.linkButton}>
          View Cast
        </Link>
        <Link to="reviews" className={styles.linkButton}>
          View Reviews
        </Link>
      </div>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
