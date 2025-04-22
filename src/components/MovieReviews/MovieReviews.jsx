import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../services/api";
import Loader from "../Loader/Loader";
import styles from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMovieReviews(movieId);
        setReviews(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Reviews</h2>
      {reviews.length === 0 ? (
        <p className={styles.noReviews}>
          No reviews found.
        </p>
      ) : (
        <ul className={styles.reviewList}>
          {reviews.map((review) => (
            <li
              key={review.id}
              className={styles.reviewItem}
            >
              <p className={styles.author}>
                <strong>{review.author}</strong>:
              </p>
              <p className={styles.content}>
                {review.content}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
