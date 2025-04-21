import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/api";
import Loader from "../Loader/Loader";
import styles from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCredits(movieId);
        setCast(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load cast.");
      } finally {
        setLoading(false);
      }
    };

    fetchCast();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li
            key={actor.cast_id || actor.id}
            className={styles.castItem}
          >
            {actor.profile_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                alt={actor.name}
                className={styles.actorImg}
              />
            )}
            <p className={styles.actorName}>{actor.name}</p>
            <p className={styles.character}>
              as {actor.character}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
