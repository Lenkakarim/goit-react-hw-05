import React from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";

const defaultImg =
  "https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map((movie) => (
        <li key={movie.id} className={styles.item}>
          <Link
            className={styles.link}
            to={`/movies/${movie.id}`}
            state={{ from: location }}
          >
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              width={250}
              height={350}
              alt={movie.title || movie.name}
              className={styles.poster}
            />
            <p className={styles.title}>
              {movie.title || movie.name}
            </p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
