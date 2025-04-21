import React from "react";
import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        404 - Page Not Found
      </h1>

      <Link to="/" className={styles.link}>
        Return to home page
      </Link>
    </div>
  );
};

export default NotFoundPage;
