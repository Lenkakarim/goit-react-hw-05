import { NavLink, useLocation } from "react-router-dom";
import styles from "./Navigation.module.css";
import classNames from "classnames";

const Navigation = () => {
  const location = useLocation();
  const isMoviesPage =
    location.pathname.startsWith("/movies");

  return (
    <header
      className={classNames(styles.header, {
        [styles.headerDark]: isMoviesPage,
      })}
    >
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            classNames(styles.navLink, {
              [styles.activeLink]: isActive,
            })
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/movies"
          className={({ isActive }) =>
            classNames(styles.navLink, {
              [styles.activeLink]: isActive,
            })
          }
        >
          Movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
